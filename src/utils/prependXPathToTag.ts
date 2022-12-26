import { XPathTag } from "../types/XPath/XPathTag";

// this mutates the tag
const prependXPathToTag = <T extends XPathTag>(prefix: string, tag: T): T => {
  tag.$.xpath = `${prefix}${tag.$.xpath}`;
  return tag;
};

export default prependXPathToTag;
