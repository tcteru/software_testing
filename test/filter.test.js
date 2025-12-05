import filter from "../src/filter.js";

describe("filter (based on the phase 1 plan)", () => {

  test("filters elements matching", () => {
    expect(filter([
                  {'item':'meat', 'sold':false},
                  {'item': 'potato', 'sold': 'true'}
                ],
                 ({sold})=>sold)).toEqual(['potato']);
  });

  test("empty array", () => {
    expect(filter([],
                 ({sold})=>sold)).toEqual([[]]);
  });

  test("predicate empty", () => {
    expect(filter([
                {'item':'meat', 'sold':false},
                {'item': 'potato', 'sold': 'true'}
              ],
                 ({})=>{})).toThrow();
  });

  test("functional content not in array", () => {
    expect(filter([
                {'item':'meat', 'sold':false},
                {'item': 'potato', 'sold': 'true'}
              ],
                 ({reserved})=>reserved)).toEqual([[]]);
  });
});


describe("filter AI implementation", () => {

  test("filters elements greater than 2", () => {
    expect(filter([1, 2, 3, 4], x => x > 2)).toEqual([3, 4]);
  });

  test("returns empty array when no elements match", () => {
    expect(filter([1, 2], x => x > 10)).toEqual([]);
  });

  test("handles empty input array", () => {
    expect(filter([], () => true)).toEqual([]);
  });

  test("predicate receives value, index, and array", () => {
    const arr = [10, 20, 30];
    const seen = [];
    const result = filter(arr, (value, index, array) => {
      seen.push([value, index, array]);
      return value >= 20;
    });
    expect(result).toEqual([20, 30]);
    expect(seen).toHaveLength(3);
    expect(seen[0][0]).toBe(10);
    expect(seen[1][1]).toBe(1);
    expect(seen[2][2]).toBe(arr);
  });

  test("does not mutate original array", () => {
    const arr = [1, 2, 3];
    const result = filter(arr, x => x % 2 === 1);
    expect(arr).toEqual([1, 2, 3]);
    expect(result).toEqual([1, 3]);
  });

  test("handles truthy/falsy values correctly", () => {
    expect(filter([0, 1, false, 2, "", 3], Boolean)).toEqual([1, 2, 3]);
  });

});
