import MusicRecord from "./../model/music-record";
import dbConfig from "../../db/db-client-config";
import { Client } from "pg";

const SELECT_ALL_MUSIC_RECORDS_SQL_QUERY: string = `select  p.id, p.title, p.author, p.price, s.count from products as p 
  left join stocks as s on p.id = s.product_id;`;

const SELECT_MUSIC_RECORD_BY_ID_SQL_QUERY: string = `select  p.title, p.author, p.price, s.count from products as p 
  left join stocks as s on p.id = s.product_id 
  where p.id = $1;`;

const CREATE_MUSIC_RECORD = `insert into products (title, author, description, price) values($1, $2, $3, $4) returning id`;
const CREATE_STOCK = `insert into stocks (product_id, count) values ($1, $2)`;

export default class ProductsDataService {
  getMusicRecordsList: () => Promise<MusicRecord[]> = async () => {
    const client = new Client(dbConfig);

    try {
      await client.connect();

      const { rows } = await client.query(SELECT_ALL_MUSIC_RECORDS_SQL_QUERY);

      return rows as MusicRecord[];
    } catch (e) {
      console.error("ERROR: GET musicRecordsList ", e);
      throw new Error();
    } finally {
      client.end();
      console.log("getMusicRecordsList: end");
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

  createProduct: (record: MusicRecord) => void = async (
    record: MusicRecord
  ) => {
    const client = new Client(dbConfig);
    try {
      await client.connect();
      await client.query("BEGIN");
      const createdRecord = await client.query({
        text: CREATE_MUSIC_RECORD,
        values: [record.title, record.author, record.description, record.price],
      });
      await client.query({
        text: CREATE_STOCK,
        values: [createdRecord.rows[0].id, record.count],
      });
      await client.query("COMMIT");
    } catch {
      if (client) {
        await client.query("ROLLBACK");
        throw new Error();
      }
    } finally {
      client.end();
    }
  };
}
