import prependXPathToTag from "./prependXPathToTag";
import { XPathTag } from "../types/XPath/XPathTag";

// it would be nice if there was some utility to create curried functions for us and preserve type information (ex. Haskell)
const curriedPrependXPathToTag =
  (prefix: string) =>
  <T extends XPathTag>(tag: T) =>
    prependXPathToTag(prefix, tag);

export default curriedPrependXPathToTag;
