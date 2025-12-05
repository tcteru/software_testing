import divide from "../src/divide.js";

describe("divide (based on the phase 1 plan)", () => {
  test("divides positive numbers", () => {
    expect(divide(6, 2)).toBe(3);
  });

  test("divides negative numbers", () => {
    expect(divide(-6, 2)).toBe(-3);
    expect(divide(6, -2)).toBe(-3);
    expect(divide(-6, -2)).toBe(3);
  });

  test("division by zero yields Infinity/-Infinity (JS behavior)", () => {
    expect(Number.isNaN(divide(-6, 0))).toBe(true);
  });

  test("zero divided by non-zero is zero", () => {
    expect(divide(0, 5)).toBe(0);
  });

  test("desimal values", () => {
    expect(divide(0.06, 0.02)).toBe(3);
    expect(divide(1, 3)).toBe(1/3);
  });

  test("non-numeric inputs produce NaN", () => {
    expect(Number.isNaN(divide("a", 2))).toBe(true);
    expect(Number.isNaN(divide(2, "a"))).toBe(true);
    expect(Number.isNaN(divide({}, 2))).toBe(true);
  });
});
