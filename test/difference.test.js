import difference from "../src/difference.js";

describe("difference", () => {
  test("returns values in first array not present in second", () => {
    expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
  });

  test("handles duplicates in first array", () => {
    expect(difference([1, 2, 2, 3], [2])).toEqual([1, 3]);
  });

  test("no overlap returns original (unique) order", () => {
    expect(difference([1, 2], [3, 4])).toEqual([1, 2]);
  });

  test("empty second array returns first array", () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  test("empty first array returns empty", () => {
    expect(difference([], [1, 2])).toEqual([]);
  });

  test("handles non-primitive comparisons if supported", () => {
    const a = { x: 1 };
    const b = { x: 1 };
    // If implementation uses SameValueZero on references, a !== b so both are kept
    expect(difference([a], [b])).toEqual([a]);
  });

  test("works with strings", () => {
    expect(difference(["a", "b", "c"], ["b"])).toEqual(["a", "c"]);
  });

  test("parameters not array", () => {
    expect(difference("a", ["b"])).toEqual([]);
    expect(difference(["a", "b", "c"], "b")).toEqual([]);
  });

});
