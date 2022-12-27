import Generator from "./Generator";
import curriedPrependXPathToTag from "../utils/curriedPrependXPathToTag";
import safeNumberFromStringFactory from "../utils/SafeNumber/safeNumberFactory";
import scaleSafeNumber from "../utils/scaleSafeNumber";
import propertyBlacklistFilter from "../utils/propertyBlacklistFilter";
import { Spawn, Gamestage, Spawner } from "./../types/files/GamestagesXMLFile";
import { SetXPathTag } from "../types/XPath/SetXPathTag";

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
  constructor(
    inFilePath: string,
    outFilePath: string,
    namespace: string,
    private scale: number
  ) {
    super(inFilePath, outFilePath, namespace);
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

    return [
      {
        _: scaleSafeNumber(num, this.scale).toString(),
        $: {
          xpath: `/spawn[@group='${spawn.$.group}']/@num`,
        },
      },
      {
        _: scaleSafeNumber(maxAlive, this.scale).toString(),
        $: {
          xpath: `/spawn[@group='${spawn.$.group}']/@maxAlive`,
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
        curriedPrependXPathToTag(`/gamestage[@stage='${gamestage.$.stage}']`)
      );

  private mapSpawner = (spawner: Spawner): Array<SetXPathTag> =>
    spawner.gamestage
      .map(this.mapGamestage)
      .flat()
      .map(curriedPrependXPathToTag(`/spawner[@name='${spawner.$.name}']`));

  public run = async () => {
    const data = await super.readFile("gamestages");
    const setTags = data.gamestages.spawner
      .filter(this.filterSpawner)
      .map(this.mapSpawner)
      .flat();
    await super.writeFile({
      set: setTags,
    });
  };
}

export default ScaleGamestageSpawnGenerator;
