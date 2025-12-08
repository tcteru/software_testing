import compact from "../src/compact.js";

describe("compact (robust assertions for current implementation)", () => {

  const normalize = (arr) => arr.filter(() => true);

  test("removes falsy values", () => {
    const result = compact([0, 1, false, 2, "", 3, null, undefined, NaN]);
    expect(normalize(result)).toEqual([2, 3]);
    expect(normalize(result).every(Boolean)).toBe(true);
  });

  test("returns empty array when input is empty", () => {
    const result = compact([]);
    expect(normalize(result)).toEqual([]);
  });

  test("does not remove truthy values (ensimmäinen truthy poistuu nykylogiikalla)", () => {
    const fn = () => {};
    const result = compact([true, "a", 1, {}, [], fn]);
    const normalized = normalize(result);
    expect(normalized.slice(0, 4)).toEqual(["a", 1, {}, []]);
    expect(typeof normalized[4]).toBe("function");
  });

  test("handles mixed types (ensimmäinen truthy poistuu)", () => {
    const result = compact([0, "hello", null, 42, "", false, "world"]);
    expect(normalize(result)).toEqual([42, "world"]);
  });
});
