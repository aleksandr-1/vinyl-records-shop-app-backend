import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import productsDataService from "./../../services";
import { musicRecordSchema } from "./../../../schema/music-record-schema";

export const createProduct = async (event): Promise<APIGatewayProxyResult> => {
  try {
    console.log("POST create ProductsList invoked: ", event);

    const musicRecords = await productsDataService.getMusicRecordsList();

    const product = JSON.parse(event.body);
    await musicRecordSchema.validateAsync(product);
    await productsDataService.createProduct(product);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(musicRecords),
    };
  } catch (e) {
    if (e.name === "ValidationError") {
      return {
        statusCode: 400,
        headers,
        body: `Please enter valid values: ${e}`,
      };
    }

    return {
      statusCode: 500,
      headers,
      body: `Error on Create Music Record: ${e}`,
    };
  }
};

export const main = middyfy(createProduct);
