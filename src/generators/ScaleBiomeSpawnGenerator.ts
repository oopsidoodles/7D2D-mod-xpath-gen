import Generator from "./Generator";
import curriedPrependXPathToTag from "../utils/curriedPrependXPathToTag";
import safeNumberFromStringFactory from "../utils/SafeNumber/safeNumberFactory";
import scaleSafeNumber from "../utils/scaleSafeNumber";
import propertyBlacklistFilter from "../utils/propertyBlacklistFilter";
import { Biome, Spawn, SpawningXMLFile } from "../types/files/SpawningXMLFile";
import { SetXPathTag } from "../types/XPath/SetXPathTag";
import { ConfigFiles } from "../types/files/ConfigFiles";
import { XPathTagCollection } from "../types/XPath/XPathTagCollection";

const SPAWN_ENTITYGROUP_BLACKLIST: Array<RegExp> = [
  /^WildGameForest$/,
  /^EnemyAnimals.*/,
];

class ScaleBiomeSpawnGenerator extends Generator {
  constructor(private scale: number) {
    super();
  }

  private filterSpawn = propertyBlacklistFilter<Spawn>(
    "entitygroup",
    SPAWN_ENTITYGROUP_BLACKLIST
  );

  // TODO this needs much more descriptive xpath tags, need a utility to combine multiple AND conditions into valid xpath
  private mapSpawn = (spawn: Spawn): SetXPathTag => {
    const maxCount = safeNumberFromStringFactory(spawn.$.maxcount);
    return {
      _: scaleSafeNumber(maxCount, this.scale).toString(),
      $: {
        xpath: `/spawn[@entitygroup='${spawn.$.entitygroup}']/@maxcount`,
      },
    };
  };

  private mapBiome = (biome: Biome): Array<SetXPathTag> =>
    biome.spawn
      .filter(this.filterSpawn)
      .map(this.mapSpawn)
      .map(curriedPrependXPathToTag(`/biome[@name='${biome.$.name}']`));

  public getConfigName = (): keyof ConfigFiles => "spawning";

  public generateXPathCollection = (
    config: SpawningXMLFile
  ): XPathTagCollection => {
    const setTags = config.spawning.biome
      .map(this.mapBiome)
      .flat()
      .map(curriedPrependXPathToTag("/spawning"));

    return {
      set: setTags,
    };
  };
}

export default ScaleBiomeSpawnGenerator;
