import mergeSingleXPathTagCollectionProperty from "./mergeSingleXPathTagCollectionProperty";
import { XPathTagCollection } from "./../../types/XPath/XPathTagCollection";

// this mutates finalCollection
const mergeXPathTagCollections = (
  finalCollection: XPathTagCollection,
  collection: XPathTagCollection
): XPathTagCollection =>
  (Object.keys(collection) as Array<keyof XPathTagCollection>).reduce(
    (currCollection, currProperty) =>
      mergeSingleXPathTagCollectionProperty(
        currCollection,
        collection,
        currProperty
      ),
    finalCollection
  );

export default mergeXPathTagCollections;
