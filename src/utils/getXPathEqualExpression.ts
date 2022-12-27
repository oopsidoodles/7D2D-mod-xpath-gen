// like getXPathAndExpression(), this too is for a very specific use case, generate an equal comparison between a property and value
const getXPathEqualExpression = <T extends { $: Record<string, string> }>(
  obj: T,
  property: keyof T["$"]
): string =>
  property in obj.$
    ? // these 'toString()' are not strictly needed, but otherwise there will be a ts error
      `@${property.toString()}='${obj.$[property.toString()]}'`
    : "";

export default getXPathEqualExpression;
