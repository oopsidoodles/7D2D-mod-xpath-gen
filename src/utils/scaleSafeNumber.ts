import SafeNumber from "./SafeNumber/SafeNumber";
import SingleSafeNumber from "./SafeNumber/SingleSafeNumber";
import RangeSafeNumber from "./SafeNumber/RangeSafeNumber";

//strategy pattern
const scaleSafeNumber = (number: SafeNumber, scale: number): SafeNumber => {
  if (number instanceof SingleSafeNumber) {
    number.Num *= scale;
  } else if (number instanceof RangeSafeNumber) {
    number.Num1 *= scale;
    number.Num2 *= scale;
  } else {
    throw new Error("number is not a SafeNumber in scaleSafeNumber");
  }
  return number;
};

export default scaleSafeNumber;
