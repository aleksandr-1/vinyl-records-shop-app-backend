import { APIGatewayProxyEvent } from "aws-lambda";
import { headers } from "../../libs/api-gateway";

import { importProductsFile } from "./handler";

describe("importProductsFile", () => {
  it("should return 400 API response", async () => {
    const event = { queryStringParameters: {} } as APIGatewayProxyEvent;

    const result = await importProductsFile(event);

    const expectedResult = {
      statusCode: 400,
      headers,
      body: `Please set correct name parameter`,
    };

    expect(result).toEqual(expectedResult);
  });
});
