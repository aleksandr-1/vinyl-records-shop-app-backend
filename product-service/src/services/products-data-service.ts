import { mockedMusicRecords } from "./../model/mocked-data";
import MusicRecord from "./../model/music-record";

export default class ProductsDataService {
  constructor() {}

  getMusicRecordsList: () => Promise<MusicRecord[]> = async () => {
    return mockedMusicRecords;
  };

  getMusicRecordById: (id: string) => Promise<MusicRecord> = async (id) => {
    return mockedMusicRecords.find((el) => el.id === id);
  };
}
