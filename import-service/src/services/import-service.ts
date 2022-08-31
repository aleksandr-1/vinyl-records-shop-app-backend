import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import csv from "csv-parser";

const {
  REGION,
  SQS_URL,
  BUCKET_NAME,
  BUCKET_ORIGIN_DATA_FOLDER,
  BUCKET_DESTINATION_FOLDER,
} = process.env;

const s3Client = new S3Client({ region: REGION });
const sqsClient = new SQSClient({ region: REGION });

export default class ImportService {
  getImportFileName: (fileName: string) => Promise<string> = async (
    fileName
  ) => {
    try {
      const s3Client = new S3Client({ region: REGION });
      const bucketParams = {
        Bucket: BUCKET_NAME,
        Key: `${BUCKET_ORIGIN_DATA_FOLDER}/${fileName}`,
        ContentType: "text/csv",
      };

      const command = new PutObjectCommand(bucketParams);
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 60,
      });

      return signedUrl;
    } catch (e) {
      console.error("ERROR: on generating Signed Url ", e);
      throw new Error();
    }
  };

  parseImportedFile: (event) => Promise<any> = async (event) => {
    try {
      for (const record of event.Records) {
        const { bucket, object } = record.s3;

        const bucketObject: GetObjectCommandOutput = await s3Client.send(
          new GetObjectCommand({
            Bucket: bucket.name,
            Key: object.key,
          })
        );

        console.log("Import service: ParseImportedFile: Start parsing");

        const parsedItemes: any[] = [];

        await new Promise((resolve) => {
          bucketObject.Body.pipe(csv())
            .on("data", (record) => {
              parsedItemes.push(record);

              const command = new SendMessageCommand({
                QueueUrl: SQS_URL,
                MessageBody: JSON.stringify(record),
              });

              sqsClient.send(command);
            })
            .on("end", resolve);
        });

        console.log("Import service: ParseImportedFile: Start moving file");

        await s3Client.send(
          new CopyObjectCommand({
            Bucket: bucket.name,
            CopySource: `${bucket.name}/${object.key}`,
            Key: `${object.key}`.replace(
              BUCKET_ORIGIN_DATA_FOLDER,
              BUCKET_DESTINATION_FOLDER
            ),
          })
        );

        console.log("Import service: ParseImportedFile: Start delete old file");
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucket.name,
            Key: `${object.key}`,
          })
        );

        return parsedItemes;
      }
      return new Promise(() => true);
    } catch (e) {
      console.error("ERROR: on parsing imported file ", e);
      throw new Error();
    }
  };
}
