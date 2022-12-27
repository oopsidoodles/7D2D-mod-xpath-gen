import SafeNumber from "./SafeNumber";
import SingleSafeNumber from "./SingleSafeNumber";
import RangeSafeNumber from "./RangeSafeNumber";

const parse = (str: string) => parseInt(str, 10);

const safeNumberFromStringFactory = (numStr: string): SafeNumber => {
  const nums = numStr.split(",").map(parse);

  if (nums.length === 1) {
    return new SingleSafeNumber(nums[0]);
  } else if (nums.length === 2) {
    return new RangeSafeNumber(nums[0], nums[1]);
  } else {
    throw new Error(
      `invalid number of parts passed into safeNumberFromStringFactory: "${numStr}"`
    );
  }
};

export default safeNumberFromStringFactory;
