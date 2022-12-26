import Generator from "./Generator";
import { SpawningXMLFile, Biome, Spawn } from "../types/SpawningXMLFile";
import { XPathTag } from "../types/XPathTag";

class BiomeSpawningGenerator extends Generator {
  constructor(inFilePath: string, outFilePath: string) {
    super(inFilePath, outFilePath);
  }

  private mapSpawn = (spawn: Spawn): XPathTag => {
    // TODO use spawn maxcount, add number conversion util
    return {
      _: "",
      $: {
        xpath: "/spawn/@maxcount",
      },
    };
  };

  private mapBiome = (biome: Biome): Array<XPathTag> => {
    // TODO xpath path prepend util here
    return biome.spawn.map(this.mapSpawn);
  };

  public run = async () => {
    const data = await super.readFile<SpawningXMLFile>();
    // TODO same prepend as mapBiome
    const res = [data.spawning.biome[0]].map(this.mapBiome).flat();
    console.dir(res, { depth: null });
  };
}

export default BiomeSpawningGenerator;
