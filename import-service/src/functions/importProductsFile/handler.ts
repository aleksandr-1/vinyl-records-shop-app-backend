import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import importService from "./../../services";

export const importProductsFile = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("GET ImportProductsFile invoked: event: ", event);

    const fileName =
      event && event.queryStringParameters && event.queryStringParameters.name;

    if (!fileName) {
      return {
        statusCode: 400,
        headers,
        body: `Please set correct name parameter`,
      };
    }

    const signedUrl = await importService.getImportFileName(fileName);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(signedUrl),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: `Error on GET import products file: ${e}`,
    };
  }
};

export const main = middyfy(importProductsFile);
