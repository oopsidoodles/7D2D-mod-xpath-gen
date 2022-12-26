import Generator from "./Generator";
import curriedPrependXPathToTag from "../utils/curriedPrependXPathToTag";
import { SpawningXMLFile, Biome, Spawn } from "../types/SpawningXMLFile";
import { SetXPathTag } from "../types/XPath/SetXPathTag";

class BiomeSpawningGenerator extends Generator {
  constructor(inFilePath: string, outFilePath: string) {
    super(inFilePath, outFilePath);
  }

  private mapSpawn = (spawn: Spawn): SetXPathTag => {
    // TODO use spawn maxcount, add number conversion util
    return {
      _: "",
      $: {
        xpath: "/spawn/@maxcount",
      },
    };
  };

  private mapBiome = (biome: Biome): Array<SetXPathTag> => {
    return biome.spawn
      .map(this.mapSpawn)
      .map(curriedPrependXPathToTag(`/biome[@name='${biome.$.name}']`));
  };

  public run = async () => {
    const data = await super.readFile<SpawningXMLFile>();
    const res = [data.spawning.biome[0]]
      .map(this.mapBiome)
      .flat()
      .map(curriedPrependXPathToTag("/spawning"));
    console.dir(res, { depth: null });
  };
}

export default BiomeSpawningGenerator;
