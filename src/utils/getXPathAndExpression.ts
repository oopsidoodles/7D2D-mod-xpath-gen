import getXPathEqualExpression from "./getXPathEqualExpression";

/*
  this is kind of a very specific and cheeky way of getting an AND in XPath for this specific entity
  it will only take the exact values of the supplied properties and only work with strings
  for full operator support and more flexibility a proper compositional class pattern can be used
*/
const getXPathAndExpression = <T extends { $: Record<string, string> }>(
  obj: T,
  properties: Array<keyof T["$"]>
) =>
  properties
    .map((property) => getXPathEqualExpression(obj, property))
    .filter((expr) => expr)
    .join(" and ");

export default getXPathAndExpression;
