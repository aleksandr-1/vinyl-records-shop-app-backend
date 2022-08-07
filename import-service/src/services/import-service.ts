export default class ImportService {
  getImportFileName: () => Promise<string> = async () => {
    try {
      return new Promise(() => "test-file-name.csv");
    } catch (e) {
      console.error("ERROR: Import File name ", e);
      throw new Error();
    } finally {
    }
  };
}
