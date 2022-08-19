import { musicRecordSchema } from "schema/music-record-schema";
import productsDataService from "src/services";
import { middyfy } from "./../../libs/lambda";

export const catalogueBatchProcess = async (event): Promise<any> => {
  try {
    console.log("catalogueBatchProcess: envoked: ", event);

    for (const eventRecord of event.Records) {
      const musicRecord = JSON.parse(eventRecord.body);

      await musicRecordSchema.validateAsync(musicRecord);
      await productsDataService.createProduct(musicRecord);
    }
  } catch (e) {
    console.error("catalogueBatchProcess: error: ", e);
  }
};

export const main = middyfy(catalogueBatchProcess);
