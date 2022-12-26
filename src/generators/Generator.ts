import parseXML from "../utils/parseXML";

abstract class Generator {
  // TODO this needs namespace tag
  constructor(private inFilePath: string, private outFilePath: string) {}

  protected async readFile<T extends any>() {
    return parseXML<T>(this.inFilePath);
  }

  // stub for now
  // TODO this can accept array of XPathTag to then make a set with namespace, add util for writing XML file to disk
  protected async writeFile() {}

  public abstract run(): Promise<void>;
}

export default Generator;
