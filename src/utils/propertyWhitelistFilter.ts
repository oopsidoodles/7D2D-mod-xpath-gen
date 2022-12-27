import propertyBlacklistFilter from "./propertyBlacklistFilter";

const propertyWhitelistFilter = <T extends { $: Record<string, string> }>(
  property: keyof T["$"],
  whitelist: Array<RegExp>
) => {
  const blacklistCheck = propertyBlacklistFilter<T>(property, whitelist);

  return (obj: T) => !blacklistCheck(obj);
};

export default propertyWhitelistFilter;
