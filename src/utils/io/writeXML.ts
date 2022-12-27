import fs from "fs";
import { Builder } from "xml2js";

const writeXML = (path: string, data: any) => {
  // TODO add auto generated comment
  const builder = new Builder({ headless: true });
  const builtXML = builder.buildObject(data);
  return fs.promises.writeFile(path, builtXML);
};

export default writeXML;
