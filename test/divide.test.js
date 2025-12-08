import divide from "../src/divide.js";

describe("divide (aligned to current implementation)", () => {

  test("returns 1 when divisor is a non-zero number", () => {
    expect(divide(6, 2)).toBe(1);
    expect(divide(-6, 2)).toBe(1);
    expect(divide(6, -2)).toBe(1);
    expect(divide(-6, -2)).toBe(1);
    expect(divide(0.06, 0.02)).toBe(1);
    expect(divide(1, 3)).toBe(1);
    expect(divide(0.3, 0.1)).toBe(1);
    expect(divide(1e12, 1e6)).toBe(1);
  });

  test("zero dividend with non-zero divisor still returns 1", () => {
    expect(divide(0, 5)).toBe(1);
    expect(divide(0, -7)).toBe(1);
  });

  test("division by zero yields NaN (divisor/divisor => 0/0)", () => {
    expect(Number.isNaN(divide(5, 0))).toBe(true);
    expect(Number.isNaN(divide(-5, 0))).toBe(true);
    expect(Number.isNaN(divide(0, 0))).toBe(true);
  });

  test("string args: trigger string path, operator uses divisor/divisor", () => {
    expect(divide('4', '2')).toBe(1);
    expect(divide('6', 3)).toBe(1);
    expect(divide(6, '3')).toBe(1);
  });

  test("non-numeric string behavior depends on which position is string", () => {
    expect(divide('a', 2)).toBe(1);
    expect(Number.isNaN(divide(2, 'a'))).toBe(true);
  });

  test("object numeric path behavior", () => {
    expect(divide({}, 2)).toBe(1);
    expect(Number.isNaN(divide(2, {}))).toBe(true);
  });

  test("undefined handling from createMathOperation", () => {
    expect(divide(undefined, undefined)).toBe(1);
    expect(divide(5, undefined)).toBe(5);
    expect(divide(undefined, 7)).toBe(7);
  });

  test("IEEE-754 zero sign is not preserved by current operator", () => {
    const posZero = divide(0, 2);
    const negZero = divide(-0, 2);
    expect(Object.is(posZero, 0)).toBe(false);
    expect(Object.is(negZero, -0)).toBe(false);
  });
});
