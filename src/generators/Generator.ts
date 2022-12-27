import parseXML from "../utils/parseXML";
import { XPathTagCollection } from "../types/XPath/XPathTagCollection";

abstract class Generator {
  // TODO this needs namespace tag
  constructor(private inFilePath: string, private outFilePath: string) {}

  // TODO this can work off a file driver, specify root path, and then type of file ex. 'spawning' and return the correct file and type
  protected async readFile<T extends any>() {
    return parseXML<T>(this.inFilePath);
  }

  // stub for now
  // TODO this can accept array of XPathTag to then make a set with namespace, add util for writing XML file to disk
  protected async writeFile(collection: XPathTagCollection) {}

  public abstract run(): Promise<void>;
}

export default Generator;
