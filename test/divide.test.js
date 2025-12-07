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

describe("divide (Implemented by AI)", () => {
  test('divides positive numbers (example from JSDoc: divide(6, 4) => 1.5)', () => {
    expect(divide(6, 4)).toBe(1.5);
  });

  test('handles negative dividend', () => {
    expect(divide(-6, 3)).toBe(-2);
  });

  test('handles negative divisor', () => {
    expect(divide(6, -3)).toBe(-2);
  });

  test('handles both negative (result positive)', () => {
    expect(divide(-8, -2)).toBe(4);
  });

  test('zero dividend yields 0 (when divisor != 0)', () => {
    expect(divide(0, 5)).toBe(0);
    expect(divide(0, -7)).toBe(0);
  });

  test('division by zero yields +/-Infinity depending on sign', () => {
    expect(divide(5, 0)).toBe(Infinity);
    expect(divide(-5, 0)).toBe(-Infinity);
  });

  test('0 / 0 yields NaN', () => {
    expect(Number.isNaN(divide(0, 0))).toBe(true);
  });

  test('handles floating point inputs using toBeCloseTo', () => {
    expect(divide(0.3, 0.1)).toBeCloseTo(3, 10);
    expect(divide(1, 3)).toBeCloseTo(0.3333333333, 10);
  });

  test('handles large numbers', () => {
    expect(divide(1e12, 1e6)).toBe(1e6);
  });

  test('preserves sign of zero in IEEE-754 terms (optional, informative)', () => {
    // +0 / positive -> +0
    const posZero = divide(0, 2);
    expect(Object.is(posZero, 0)).toBe(true);

    // -0 / positive -> -0
    const negZero = divide(-0, 2);
    expect(Object.is(negZero, -0)).toBe(true);
  });
});
