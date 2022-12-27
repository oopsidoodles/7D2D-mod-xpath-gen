import ConfigFileDriver from "../utils/ConfigFileDriver";
import parseXML from "../utils/parseXML";
import writeXML from "../utils/writeXML";
import { XPathTagCollection } from "../types/XPath/XPathTagCollection";

abstract class Generator {
  private configFileDriver: ConfigFileDriver;

  constructor(
    private inFileDir: string,
    private outFilePath: string,
    private namespace: string
  ) {
    this.configFileDriver = new ConfigFileDriver(inFileDir);
  }

  protected async readFile<
    T extends Parameters<
      typeof ConfigFileDriver["prototype"]["readConfigFile"]
    >[0]
  >(name: T) {
    return this.configFileDriver.readConfigFile(name);
  }

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
