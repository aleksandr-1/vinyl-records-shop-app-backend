import { headers } from "./../../libs/api-gateway";
import { middyfy } from "./../../libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import productsDataService from "./../../services";

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    console.log("GET ProductsList invoked");

    const musicRecords = await productsDataService.getMusicRecordsList();

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

export const main = middyfy(getProductsList);
