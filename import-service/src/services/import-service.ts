import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { REGION, BUCKET_NAME } = process.env;

export default class ImportService {
  getImportFileName: (fileName: string) => Promise<string> = async (
    fileName
  ) => {
    try {
      const s3Client = new S3Client({ region: REGION });
      const bucketParams = {
        Bucket: BUCKET_NAME,
        Key: `uploaded/${fileName}`,
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
    } finally {
    }
  };
}
