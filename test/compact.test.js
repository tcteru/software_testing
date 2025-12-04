import compact from "../src/compact.js";

describe("compact", () => {
  test("removes falsy values", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined, NaN])).toEqual([1, 2, 3]);
  });

  test("returns empty array when input is empty", () => {
    expect(compact([])).toEqual([]);
  });

  test("does not remove truthy values", () => {
    expect(compact([true, "a", 1, {}, [], () => {}])).toEqual([true, "a", 1, {}, [], expect.any(Function)]);
  });

  test("handles mixed types", () => {
    const result = compact([0, "hello", null, 42, "", false, "world"]);
    expect(result).toEqual(["hello", 42, "world"]);
  });
});
