import Generator from "./Generator";
import curriedPrependXPathToTag from "../utils/xpath/curriedPrependXPathToTag";
import safeNumberFromStringFactory from "../utils/SafeNumber/safeNumberFactory";
import scaleSafeNumber from "../utils/SafeNumber/scaleSafeNumber";
import propertyBlacklistFilter from "../utils/propertyBlacklistFilter";
import getXPathEqualExpression from "../utils/xpath/getXPathEqualExpression";
import { Spawn, Gamestage, Spawner } from "./../types/files/GamestagesXMLFile";
import { SetXPathTag } from "../types/XPath/SetXPathTag";
import { GamestagesXMLFile } from "./../types/files/GamestagesXMLFile";
import { XPathTagCollection } from "../types/XPath/XPathTagCollection";
import { ConfigFiles } from "../types/files/ConfigFiles";

const SPAWNER_NAME_BLACKLIST = [/^animal.*$/];

const SPAWN_GROUP_BLACKLIST = [
  /^ZombieBearsGroup$/,
  /^VultureGroup$/,
  /^WolfPack$/,
  /^WolfGroup$/,
  /^ZombieAnimalsGroup$/,
  /^ZombieDogGroup$/,
  /^EnemyAnimalsCoyote$/,
];

class ScaleGamestageSpawnGenerator extends Generator {
  constructor(private scale: number) {
    super();
  }

  private filterSpawn = propertyBlacklistFilter<Spawn>(
    "group",
    SPAWN_GROUP_BLACKLIST
  );

  private filterSpawner = propertyBlacklistFilter<Spawner>(
    "name",
    SPAWNER_NAME_BLACKLIST
  );

  private mapSpawn = (spawn: Spawn): Array<SetXPathTag> => {
    const num = safeNumberFromStringFactory(spawn.$.num);
    const maxAlive = safeNumberFromStringFactory(spawn.$.maxAlive);
    const groupCondition = getXPathEqualExpression<Spawn>(spawn, "group");

    return [
      {
        _: scaleSafeNumber(num, this.scale).toString(),
        $: {
          xpath: `/spawn[${groupCondition}]/@num`,
        },
      },
      {
        _: scaleSafeNumber(maxAlive, this.scale).toString(),
        $: {
          xpath: `/spawn[${groupCondition}]/@maxAlive`,
        },
      },
    ];
  };

  private mapGamestage = (gamestage: Gamestage): Array<SetXPathTag> =>
    gamestage.spawn
      .filter(this.filterSpawn)
      .map(this.mapSpawn)
      .flat()
      .map(
        curriedPrependXPathToTag(
          `/gamestage[${getXPathEqualExpression<Gamestage>(
            gamestage,
            "stage"
          )}]`
        )
      );

  private mapSpawner = (spawner: Spawner): Array<SetXPathTag> =>
    spawner.gamestage
      .map(this.mapGamestage)
      .flat()
      .map(
        curriedPrependXPathToTag(
          `/spawner[${getXPathEqualExpression<Spawner>(spawner, "name")}]`
        )
      );

  public getConfigName = (): keyof ConfigFiles => "gamestages";

  public generateXPathCollection = (
    config: GamestagesXMLFile
  ): XPathTagCollection => {
    const setTags = config.gamestages.spawner
      .filter(this.filterSpawner)
      .map(this.mapSpawner)
      .flat();

    return {
      set: setTags,
    };
  };
}

export default ScaleGamestageSpawnGenerator;
