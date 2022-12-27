import fs from "fs";
import { Parser } from "xml2js";

const readXML = async <T extends any>(path: string): Promise<T> => {
  const parser = new Parser();
  const data = await fs.promises.readFile(path, "utf8");
  return parser.parseStringPromise(data);
};

export default readXML;
