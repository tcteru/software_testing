import filter from "../src/filter.js";

describe('filter', () => {
  test('filters values where predicate is truthy', () => {
    const arr = [1, 2, 3, 4];
    const result = filter(arr, (v) => v % 2 === 0);
    // When there are matches, current implementation produces a flat array.
    expect(result).toEqual([2, 4]);
  });

  test('returns [[]] when no element matches predicate (current implementation)', () => {
    const arr = [1, 3, 5];
    const result = filter(arr, (v) => v % 2 === 0);
    // Current code initializes result = [[]] and never assigns when there are no matches.
    expect(result).toEqual([[]]);
  });

  test('predicate receives (value, index, array)', () => {
    const arr = ['a', 'b', 'c'];
    const calls = [];
    const result = filter(arr, (v, i, a) => {
      calls.push([v, i, a]);
      return i < a.length - 1;
    });
    expect(result).toEqual(['a', 'b']);
    expect(calls).toEqual([
      ['a', 0, arr],
      ['b', 1, arr],
      ['c', 2, arr],
    ]);
  });

  test('does not mutate original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    filter(arr, (v) => v > 1);
    expect(arr).toEqual(copy);
  });

  test('handles falsy values in input (truthy and falsy filters)', () => {
    const arr = [0, '', null, undefined, false, NaN, 'x', 1];
    const resultTruthy = filter(arr, (v) => v); // only truthy
    expect(resultTruthy).toEqual(['x', 1]);

    const resultIsFalsy = filter(arr, (v) => !v || Number.isNaN(v));
    // If every item is falsy, result should be `[[]]` per current implementation.
    // Here some items are falsy; ensure falsy ones are selected correctly.
    expect(resultIsFalsy).toEqual([0, '', null, undefined, false, NaN]);
  });

  test('predicate returning non-boolean values is coerced to boolean', () => {
    const arr = [1, 2, 3];
    const result = filter(arr, (v) => v - 2); // [-1, 0, 1] => truthy for 1 and 3
    expect(result).toEqual([1, 3]);
  });

  test('sparse arrays: holes are skipped', () => {
    const arr = [1, , 3, , 5];
    const calls = [];
    const result = filter(arr, (v, i) => {
      calls.push(i);
      return v % 2 === 1;
    });
    expect(result).toEqual([1, 3, 5]);
    expect(calls).toEqual([0, 2, 4]); // no calls for holes 1 and 3
  });

  test('null and undefined array inputs yield empty array', () => {
    expect(filter(null, () => true)).toEqual([]);
    expect(filter(undefined, () => true)).toEqual([]);
  });
});
