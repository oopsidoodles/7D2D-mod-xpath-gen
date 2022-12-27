import fs from "fs";
import { Builder } from "xml2js";

// TODO this should have better typing
const writeXML = (path: string, data: any) => {
  // TODO add auto generated comment
  // TODO remove xml declaration from top of file
  const builder = new Builder({ headless: true });
  const builtXML = builder.buildObject(data);
  return fs.promises.writeFile(path, builtXML);
};

export default writeXML;
