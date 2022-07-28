import MusicRecord from "./../model/music-record";

import dbConfig from "../../db/db-client-config";

import { Client } from "pg";

const SELECT_ALL_MUSIC_RECORDS_SQL_QUERY: string = `select  p.id, p.title, p.author, p.price, s.count from products as p 
  left join stocks as s on p.id = s.product_id;`;

const SELECT_MUSIC_RECORD_BY_ID_SQL_QUERY: string = `select  p.title, p.author, p.price, s.count from products as p 
  left join stocks as s on p.id = s.product_id 
  where p.id = $1;`;

export default class ProductsDataService {
  constructor() {}

  getMusicRecordsList: () => Promise<MusicRecord[]> = async () => {
    const client = new Client(dbConfig);

    try {
      await client.connect();
      console.log('getMusicRecordsList: connect');

      const { rows } = await client.query(SELECT_ALL_MUSIC_RECORDS_SQL_QUERY);

      console.log('getMusicRecordsList: connect: rows: ', rows);

      return rows as MusicRecord[];
    } catch (e) {
      console.error('ERROR: GET musicRecordsList ', e);
    } finally {
      client.end();
    }
  };

  getMusicRecordById: (id: string) => Promise<MusicRecord> = async (id) => {
    const client = new Client(dbConfig);

    try {
      await client.connect();

      const { rows } = await client.query(SELECT_MUSIC_RECORD_BY_ID_SQL_QUERY, [
        id,
      ]);

      return rows && rows[0] ? (rows[0] as MusicRecord) : null;
    } catch (e) {
      console.error(e);
    } finally {
      client.end();
    }
  };
}
