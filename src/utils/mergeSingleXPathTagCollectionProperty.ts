import { XPathTagCollection } from "../types/XPath/XPathTagCollection";

// this mutates finalCollection
const mergeSingleXPathTagCollectionProperty = (
  finalCollection: XPathTagCollection,
  collection: XPathTagCollection,
  property: keyof XPathTagCollection
) => {
  const originalTags = finalCollection[property] ?? [];
  const newTags = collection[property] ?? [];
  finalCollection[property] = [...originalTags, ...newTags];
  return finalCollection;
};

export default mergeSingleXPathTagCollectionProperty;
