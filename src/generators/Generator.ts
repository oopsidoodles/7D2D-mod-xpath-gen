import { XPathTagCollection } from "../types/XPath/XPathTagCollection";
import { ConfigFiles } from "./../types/files/ConfigFiles";

abstract class Generator {
  constructor() {}

  public abstract getConfigName(): keyof ConfigFiles;

  public abstract generateXPathCollection(
    config: ConfigFiles[keyof ConfigFiles]
  ): XPathTagCollection;
}

export default Generator;
