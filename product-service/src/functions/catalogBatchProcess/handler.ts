import { middyfy } from "./../../libs/lambda";

export const catalogueBatchProcess = async (event): Promise<any> => {
  try {
    console.log("catalogueBatchProcess: envoked: ", event);
  } catch (e) {
    console.error("catalogueBatchProcess: error: ", e);
  }
};

export const main = middyfy(catalogueBatchProcess);
