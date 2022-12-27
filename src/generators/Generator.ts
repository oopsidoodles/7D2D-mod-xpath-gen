import parseXML from "../utils/parseXML";
import writeXML from "../utils/writeXML";
import { XPathTagCollection } from "../types/XPath/XPathTagCollection";

abstract class Generator {
  constructor(
    private inFilePath: string,
    private outFilePath: string,
    private namespace: string
  ) {}

  // TODO this can work off a file driver, specify root path, and then type of file ex. 'spawning' and return the correct file and type
  protected async readFile<T extends any>() {
    return parseXML<T>(this.inFilePath);
  }

  // stub for now
  // TODO this can accept array of XPathTag to then make a set with namespace, add util for writing XML file to disk
  protected async writeFile(collection: XPathTagCollection): Promise<void> {
    const namespacedCollection = {
      [this.namespace]: collection,
    };
    await writeXML(this.outFilePath, namespacedCollection);
  }

  // TODO refactor using pattern I forget name of to already do the read and write file for you, simply return a collection from the run
  public abstract run(): Promise<void>;
}

export default Generator;
