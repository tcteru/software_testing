import upperFirst from "../src/upperFirst.js";

describe("upperFirst", () => {
  test("uppercases the first character and leaves the rest", () => {
    expect(upperFirst("hello")).toBe("Hello");
    expect(upperFirst("world")).toBe("World");
  });

  test("handles already capitalized strings", () => {
    expect(upperFirst("Hello")).toBe("Hello");
  });

  test("handles mixed-case strings", () => {
    expect(upperFirst("hELLO")).toBe("HELLO");
    expect(upperFirst("jAvA")).toBe("JAvA");
  });

  test("handles empty string", () => {
    expect(upperFirst("")).toBe("");
  });

  test("non-string inputs are coerced to string if supported", () => {
    expect(upperFirst(123)).toBe("123");
    expect(upperFirst(true)).toBe("True");
    expect(upperFirst(null)).toBe("Null");
    expect(upperFirst(undefined)).toBe("Undefined");
  });
});
