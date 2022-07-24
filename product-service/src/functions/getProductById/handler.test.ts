import { headers } from "./../../libs/api-gateway";
import { mockedMusicRecords } from "./../../model/mocked-data";
import { getProductById } from "./handler";
import { APIGatewayEvent } from "aws-lambda";

describe("getProductById", () => {
  let aPIGatewayProxyResult;

  beforeEach(() => {
    aPIGatewayProxyResult = { statusCode: 200, headers };
  });

  it("should return correct API response", async () => {
    const productId = mockedMusicRecords[0].id;

    aPIGatewayProxyResult.body = JSON.stringify(mockedMusicRecords[0]);

    const result = await getProductById({
      pathParameters: { productId },
    } as unknown as APIGatewayEvent);

    expect(result).toEqual(aPIGatewayProxyResult);
  });

  it("should return 400 code if id is not provided", async () => {
    const result = await getProductById({
      pathParameters: { productId: undefined },
    } as unknown as APIGatewayEvent);
    const expectedResult = {
      statusCode: 400,
      body: "Please enter correct id",
    };

    expect(result).toEqual(expectedResult);
  });
});
