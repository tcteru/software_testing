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


describe("filter (Implemented by AI)", () => {
  test('filters elements based on predicate (basic numbers)', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const result = filter(arr, (n) => n % 2 === 0);
    expect(result).toEqual([2, 4, 6]);
  });

  test('example from JSDoc: filters objects by active=true', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).toEqual([{ user: 'barney', active: true }]);
  });

  test('passes (value, index, array) to predicate', () => {
    const arr = ['a', 'b', 'c'];
    const seen = [];
    const result = filter(arr, (value, index, array) => {
      seen.push({ value, index, sameArray: array === arr });
      return index % 2 === 0;
    });
    expect(result).toEqual(['a', 'c']);
    expect(seen).toEqual([
      { value: 'a', index: 0, sameArray: true },
      { value: 'b', index: 1, sameArray: true },
      { value: 'c', index: 2, sameArray: true },
    ]);
  });

  test('returns a new array instance (does not return original reference)', () => {
    const arr = [1, 2, 3];
    const result = filter(arr, (n) => n > 0);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(arr);
  });

  test('does not mutate the input array', () => {
    const arr = [1, 2, 3];
    const copy = arr.slice();
    filter(arr, (n) => n > 1);
    expect(arr).toEqual(copy);
  });

  test('returns empty array when no elements match', () => {
    const arr = [1, 2, 3];
    const result = filter(arr, () => false);
    // Bug in current implementation would return `[[]]`
    expect(result).toEqual([]);
  });

  test('handles empty array input', () => {
    const arr = [];
    const predicate = jest.fn(() => true);
    const result = filter(arr, predicate);
    expect(result).toEqual([]);
    expect(predicate).not.toHaveBeenCalled(); // length 0 => no calls
  });

  test('handles null/undefined array by returning empty array', () => {
    const predicate = jest.fn(() => true);

    const resNull = filter(null, predicate);
    expect(resNull).toEqual([]);
    expect(predicate).not.toHaveBeenCalled();

    const resUndef = filter(undefined, predicate);
    expect(resUndef).toEqual([]);
    expect(predicate).not.toHaveBeenCalled();
  });

  test('works with sparse arrays (iterates by index/length)', () => {
    // Create a sparse array: [ , 2, , 4 ]
    const arr = [];
    arr.length = 4;
    arr[1] = 2;
    arr[3] = 4;

    const result = filter(arr, (value) => value != null);
    expect(result).toEqual([2, 4]);
  });

  test('predicate truthiness: any truthy value should include element', () => {
    const arr = [0, 1, 2, 3];
    const result = filter(arr, (n) => (n % 2 ? 'yes' : 0)); // truthy/falsey
    expect(result).toEqual([1, 3]);
  });
});

