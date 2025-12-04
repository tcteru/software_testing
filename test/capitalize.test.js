import capitalize from "../src/capitalize.js";

describe("capitalize", () => {
  test("capitalizes first letter and lowercases the rest", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("hELLO")).toBe("Hello");
  });

  test("handles empty and single char", () => {
    expect(capitalize("")).toBe("");
    expect(capitalize("a")).toBe("A");
  });

  test("non-string inputs", () => {
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
    expect(capitalize(123)).toBe("123");
  });
});
