import Generator from "./Generator";
import curriedPrependXPathToTag from "../utils/xpath/curriedPrependXPathToTag";
import safeNumberFromStringFactory from "../utils/SafeNumber/safeNumberFactory";
import scaleSafeNumber from "../utils/SafeNumber/scaleSafeNumber";
import propertyBlacklistFilter from "../utils/propertyBlacklistFilter";
import getXPathEqualExpression from "../utils/xpath/getXPathEqualExpression";
import getXPathAndExpression from "../utils/xpath/getXPathAndExpression";
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

  private mapSpawn = (spawn: Spawn): SetXPathTag => {
    const maxCount = safeNumberFromStringFactory(spawn.$.maxcount);
    return {
      _: scaleSafeNumber(maxCount, this.scale).toString(),
      $: {
        xpath: `/spawn[${getXPathAndExpression<Spawn>(spawn, [
          "entitygroup",
          "time",
          "tags",
          "notags",
        ])}]/@maxcount`,
      },
    };
  };

  private mapBiome = (biome: Biome): Array<SetXPathTag> =>
    biome.spawn
      .filter(this.filterSpawn)
      .map(this.mapSpawn)
      .map(
        curriedPrependXPathToTag(
          `/biome[${getXPathEqualExpression<Biome>(biome, "name")}]`
        )
      );

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
