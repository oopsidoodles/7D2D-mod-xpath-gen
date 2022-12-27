import Generator from "./Generator";
import ConfigFileService from "../utils/ConfigFileService";
import mergeXPathTagCollections from "../utils/mergeXPathTagCollections";
import writeXML from "../utils/writeXML";
import { ConfigFiles } from "../types/files/ConfigFiles";
import { XPathTagCollection } from "./../types/XPath/XPathTagCollection";

type AssociatedXPathTagCollection = [XPathTagCollection, keyof ConfigFiles];

type XPathTagCollectionConfigMap = Partial<{
  [K in keyof ConfigFiles]: XPathTagCollection;
}>;

// lf better name
// this class is tightly coupled with ConfigFileService
class GeneratorManager {
  private configFileService: ConfigFileService;
  private generators: Array<Generator>;

  constructor(
    private inFileDir: string,
    private outfileDir: string,
    private namespace: string
  ) {
    this.configFileService = new ConfigFileService(inFileDir, outfileDir);
    this.generators = [];
  }

  private getConfigFile = <T extends keyof ConfigFiles>(
    name: T
  ): Promise<ConfigFiles[T]> => {
    return this.configFileService.readConfigFile(name);
  };

  private getNamespacedCollection = (
    collection: XPathTagCollection
  ): { [K in string]: XPathTagCollection } => ({
    [this.namespace]: collection,
  });

  private writeXPathTagCollection = async (
    collection: XPathTagCollection,
    configName: keyof ConfigFiles
  ): Promise<void> => {
    const namespacedCollection = this.getNamespacedCollection(collection);
    await this.configFileService.writeConfigFile(
      namespacedCollection,
      configName
    );
  };

  public addGenerator = (generator: Generator): void => {
    this.generators.push(generator);
  };

  private getSingleXPathCollection = async (
    generator: Generator
  ): Promise<AssociatedXPathTagCollection> => {
    const configName = generator.getConfigName();
    const configFile = await this.getConfigFile(configName);
    const collection = await generator.generateXPathCollection(configFile);
    return [collection, configName];
  };

  private getAllXPathCollections = async (
    generators: Array<Generator>
  ): Promise<Array<AssociatedXPathTagCollection>> =>
    Promise.all(generators.map(this.getSingleXPathCollection));

  private mergeAllXPathCollections = (
    associatedCollections: Array<AssociatedXPathTagCollection>
  ): XPathTagCollectionConfigMap => {
    const resultMap: XPathTagCollectionConfigMap = {};

    associatedCollections.forEach(([collection, configName]) => {
      if (!resultMap[configName]) {
        resultMap[configName] = collection;
        return;
      }

      resultMap[configName] = mergeXPathTagCollections(
        // @ts-expect-error obviously 'resultMap[configName]' is defined here
        resultMap[configName],
        collection
      );
    });

    return resultMap;
  };

  public run = async (): Promise<void> => {
    const collections = await this.getAllXPathCollections(this.generators);
    const finalAssociatedCollections =
      this.mergeAllXPathCollections(collections);
    await Promise.all(
      Object.entries(finalAssociatedCollections).map(
        ([configName, collection]) =>
          // @ts-expect-error 'Object.entries' loses type information for the keys, it uses 'string' but the actual type is 'keyof ConfigFiles'
          this.writeXPathTagCollection(collection, configName)
      )
    );
  };
}

export default GeneratorManager;
