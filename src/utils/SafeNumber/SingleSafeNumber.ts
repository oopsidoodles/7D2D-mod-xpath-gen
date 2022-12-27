import SafeNumber from "./SafeNumber";

class SingleSafeNumber extends SafeNumber {
  constructor(private num: number) {
    super();
  }

  get Num() {
    return this.num;
  }

  set Num(val) {
    this.num = val;
  }

  toString(): string {
    return this.num.toString();
  }
}

export default SingleSafeNumber;
