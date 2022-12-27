import Generator from "./Generator";
import curriedPrependXPathToTag from "../utils/curriedPrependXPathToTag";
import safeNumberFromStringFactory from "../utils/SafeNumber/safeNumberFactory";
import scaleSafeNumber from "../utils/scaleSafeNumber";
import { SpawningXMLFile, Biome, Spawn } from "../types/files/SpawningXMLFile";
import { SetXPathTag } from "../types/XPath/SetXPathTag";

const SPAWN_ENTITYGROUP_BLACKLIST: Array<RegExp> = [
  /^WildGameForest$/,
  /^EnemyAnimals.*/,
];

class ScaleBiomeSpawnGenerator extends Generator {
  constructor(
    inFilePath: string,
    outFilePath: string,
    namespace: string,
    private scale: number
  ) {
    super(inFilePath, outFilePath, namespace);
  }

  private filterSpawn = (spawn: Spawn): boolean => {
    // written in this way for quick return
    for (const entityGroup of SPAWN_ENTITYGROUP_BLACKLIST) {
      if (spawn.$.entitygroup.match(entityGroup)) {
        return false;
      }
    }
    return true;
  };

  private mapSpawn = (spawn: Spawn): SetXPathTag => {
    const maxCount = safeNumberFromStringFactory(spawn.$.maxcount);
    return {
      _: scaleSafeNumber(maxCount, this.scale).toString(),
      $: {
        xpath: `/spawn[@entitygroup='${spawn.$.entitygroup}']/@maxcount`,
      },
    };
  };

  private mapBiome = (biome: Biome): Array<SetXPathTag> => {
    return biome.spawn
      .filter(this.filterSpawn)
      .map(this.mapSpawn)
      .map(curriedPrependXPathToTag(`/biome[@name='${biome.$.name}']`));
  };

  public run = async () => {
    const data = await super.readFile("spawning");
    const setTags = data.spawning.biome
      .map(this.mapBiome)
      .flat()
      .map(curriedPrependXPathToTag("/spawning"));
    await super.writeFile({
      set: setTags,
    });
  };
}

export default ScaleBiomeSpawnGenerator;
