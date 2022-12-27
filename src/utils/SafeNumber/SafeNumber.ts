// lack of operator overloading means I can over-engineer the hell out of this
abstract class SafeNumber {
  abstract toString(): string;
}

export default SafeNumber;
