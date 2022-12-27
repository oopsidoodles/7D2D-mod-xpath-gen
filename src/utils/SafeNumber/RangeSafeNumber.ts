import SafeNumber from "./SafeNumber";

class RangeSafeNumber extends SafeNumber {
  constructor(private num1: number, private num2: number) {
    super();
  }

  get Num1() {
    return this.num1;
  }

  set Num1(val) {
    this.num1 = val;
  }

  get Num2() {
    return this.num2;
  }

  set Num2(val) {
    this.num2 = val;
  }

  toString(): string {
    return `${this.num1.toString()},${this.num2.toString()}`;
  }
}

export default RangeSafeNumber;
