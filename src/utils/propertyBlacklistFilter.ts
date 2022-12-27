import { Spawn } from "../types/files/SpawningXMLFile";

const propertyBlacklistFilter =
  <T extends { $: {} }>(property: keyof T["$"], blacklist: Array<RegExp>) =>
  (obj: T) => {
    // written in this way for quick return
    for (const blacklisted of blacklist) {
      // @ts-expect-error the error states 'property' cannot be used to index 'obj.$' but by definition it can
      if (obj.$[property].match(blacklisted)) {
        return false;
      }
    }
    return true;
  };

export default propertyBlacklistFilter;
