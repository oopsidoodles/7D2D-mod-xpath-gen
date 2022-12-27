import Generator from "./Generator";
import safeNumberFromStringFactory from "../utils/SafeNumber/safeNumberFactory";
import scaleSafeNumber from "../utils/SafeNumber/scaleSafeNumber";
import getXPathEqualExpression from "../utils/xpath/getXPathEqualExpression";
import curriedPrependXPathToTag from "../utils/xpath/curriedPrependXPathToTag";
import propertyWhitelistFilter from "../utils/propertyWhitelistFilter";
import propertyBlacklistFilter from "../utils/propertyBlacklistFilter";
import { ConfigFiles } from "../types/files/ConfigFiles";
import {
  SpawningXMLFile,
  Property,
  Day,
  EntitySpawner,
} from "../types/files/SpawningXMLFile";
import { XPathTagCollection } from "../types/XPath/XPathTagCollection";
import { XPathTag } from "./../types/XPath/XPathTag";

const PROPERTY_NAME_WHITELIST = [/^TotalAlive$/, /^TotalPerWave$/];

const DAY_PROPERTY_ENTITYGROUP_BLACKLIST = [
  /^ZombieDogGroup$/,
  /^VultureGroup$/,
  /^WolfPack$/,
  /^WolfGroup$/,
];

class ScaleLegacySpawnGenerator extends Generator {
  constructor(private scale: number) {
    super();
  }

  public getConfigName = (): keyof ConfigFiles => "spawning";

  private filterPropertyByName = propertyWhitelistFilter<Property>(
    "name",
    PROPERTY_NAME_WHITELIST
  );

  private filterEntityGroupPropertyByName = propertyBlacklistFilter<Property>(
    "value",
    DAY_PROPERTY_ENTITYGROUP_BLACKLIST
  );

  private filterDayByEntityGroupProperty = (day: Day): boolean => {
    const entityGroupProperty = day.property.find(
      (property) => property.$.name === "EntityGroupName"
    );

    if (!entityGroupProperty) {
      throw new Error("no EntityGroup Property found for Day");
    }

    return this.filterEntityGroupPropertyByName(entityGroupProperty);
  };

  private mapProperty = (property: Property): XPathTag => {
    const value = safeNumberFromStringFactory(property.$.value);

    return {
      _: scaleSafeNumber(value, this.scale).toString(),
      $: {
        xpath: `/property[${getXPathEqualExpression(property, "name")}]/@value`,
      },
    };
  };

  private mapDay = (day: Day): Array<XPathTag> =>
    day.property
      .filter(this.filterPropertyByName)
      .map(this.mapProperty)
      .map(
        curriedPrependXPathToTag(
          `/day[${getXPathEqualExpression(day, "value")}]`
        )
      );

  private mapEntitySpawner = (entitySpawner: EntitySpawner): Array<XPathTag> =>
    entitySpawner.day
      .filter(this.filterDayByEntityGroupProperty)
      .map(this.mapDay)
      .flat()
      .map(
        curriedPrependXPathToTag(
          `/entityspawner[${getXPathEqualExpression(entitySpawner, "name")}]`
        )
      );

  public generateXPathCollection = (
    config: SpawningXMLFile
  ): XPathTagCollection => {
    const setTags = config.spawning.entityspawner
      .map(this.mapEntitySpawner)
      .flat()
      .map(curriedPrependXPathToTag("/spawning"));

    return {
      set: setTags,
    };
  };
}

export default ScaleLegacySpawnGenerator;
