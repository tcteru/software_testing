import divide from "../src/divide.js";

describe("divide", () => {
  test("divides positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divides negative numbers", () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test("division by zero yields Infinity/-Infinity (JS behavior)", () => {
    expect(divide(1, 0)).toBe(Infinity);
    expect(divide(-1, 0)).toBe(-Infinity);
  });

  test("zero divided by non-zero is zero", () => {
    expect(divide(0, 5)).toBe(0);
    expect(divide(0, -5)).toBe(0);
  });

  test("non-numeric inputs produce NaN", () => {
    expect(Number.isNaN(divide("a", 2))).toBe(true);
    expect(Number.isNaN(divide(2, "b"))).toBe(true);
    expect(Number.isNaN(divide({}, 1))).toBe(true);
    expect(Number.isNaN(divide(1, {}))).toBe(true);
  });
});
