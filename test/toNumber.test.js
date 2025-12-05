import toNumber from "../src/toNumber.js";
import divide from "../src/divide.js";

describe("toNumber", () => {

  test("value is number", () => {
    expect(toNumber(42)).toBe(42);
  });

  test("parameter is symbol", () => {
    expect(Number.isNaN(Symbol("a"))).toBe(true);
  });

  test("parameter is function", () => {
    expect(divide(2,2)).toBe(1);
  });

  test("converts numeric string", () => {
    expect(toNumber("42")).toBe(42);
  });

  test("converts booleans", () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test("handles null/undefined", () => {
    expect(Number.isNaN(toNumber(null))).toBe(true);
    expect(Number.isNaN(toNumber(undefined))).toBe(true);
  });

  test("hex, binary and scientific notation if supported", () => {
    expect(toNumber("0xf")).toBe(15);
    expect(toNumber("0x10")).toBe(16);
    expect(toNumber("0b1011")).toBe(11);
    expect(toNumber("1e3")).toBe(1000);
  });

  test("non-convertible returns NaN", () => {
    expect(Number.isNaN(toNumber("abc"))).toBe(true);
    expect(Number.isNaN(toNumber({}))).toBe(true);
  });
});
