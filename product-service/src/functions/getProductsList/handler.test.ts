import { headers } from "../../libs/api-gateway";
import { mockedMusicRecords } from "../../model/mocked-data";
import { getProductsList } from "./handler";

describe("getProductsList", () => {

  it("should return correct API response", async () => {
    const result = await getProductsList();

    const expectedResult = {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockedMusicRecords),
    };

    expect(result).toEqual(expectedResult);
  });
});
