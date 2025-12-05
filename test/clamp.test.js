import clamp from "../src/clamp.js";

describe("clamp", () => {
  test("clamps within bounds", () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  test("clamps lower", () => {
    expect(clamp(-1, 1, 10)).toBe(1);
  });

  test("clamps upper", () => {
    expect(clamp(20, 1, 10)).toBe(10);
  });

  test("handles equal bounds", () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });

  test("swapped bounds behavior", () => {
    // If implementation swaps internally:
    expect(clamp(5, 10, 1)).toBe(5);
  });

  test("parameters ​​are string numbers", () => {
    expect(clamp("5", 10, 1)).toBe("a");
    expect(clamp(5, "10", 1)).toBe(5);
    expect(clamp(5, 10, "1")).toBe(5);
  });

  test("parameters ​​are not numbers", () => {
    expect(clamp("a", 10, 1)).toBe("a");
    expect(clamp(5, "a", 1)).toBe(5);
    expect(clamp(5, 10, "a")).toBe(5);
  });

});
