import { middyfy } from "./../../libs/lambda";
import { APIGatewayProxyResult, S3Event } from "aws-lambda";
import importService from "./../../services";
import { headers } from "@libs/api-gateway";

export const importFileParser = async (
  event: S3Event
): Promise<APIGatewayProxyResult> => {
  try {
    await importService.parseImportedFile(event);

    console.log("Import service: ParseImportedFile: Parsed Successfully: ");

    return {
      statusCode: 200,
      headers,
      body: "Parsed Successfuly",
    };
  } catch {
    return {
      statusCode: 500,
      headers,
      body: "Error on file parsing",
    };
  }
};

export const main = middyfy(importFileParser);
