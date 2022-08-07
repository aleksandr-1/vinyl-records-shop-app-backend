import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import importService from "./../../services";

export const importProductsFile = async (): Promise<APIGatewayProxyResult> => {
  try {
    console.log("GET ImportProductsFile invoked");

    const musicRecords = await importService.getImportFileName();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(musicRecords),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: `Error on GET Music Records List: ${e}`,
    };
  }
};

export const main = middyfy(importProductsFile);
