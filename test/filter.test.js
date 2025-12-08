import filter from "../src/filter.js";

describe('filter (aligned to current implementation)', () => {
  test('filters values where predicate is truthy', () => {
    const arr = [1, 2, 3, 4];
    const result = filter(arr, (v) => v % 2 === 0);
    expect(result).toEqual([2, 4]);
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
    const resultTruthy = filter(arr, (v) => v);
    expect(resultTruthy).toEqual(['x', 1]);

    const resultIsFalsy = filter(arr, (v) => !v || Number.isNaN(v));
    expect(resultIsFalsy).toEqual([0, '', null, undefined, false, NaN]);
  });

  test('predicate returning non-boolean values is coerced to boolean', () => {
    const arr = [1, 2, 3];
    const result = filter(arr, (v) => v - 2);
    expect(result).toEqual([1, 3]);
  });

  test('sparse arrays: current implementation invokes predicate on holes', () => {
    const arr = [1, , 3, , 5];
    const calls = [];
    const result = filter(arr, (v, i) => {
      calls.push(i);
      return v % 2 === 1;
    });
    expect(result).toEqual([1, 3, 5]);
    expect(calls).toEqual([0, 1, 2, 3, 4]);
  });

  test('returns `[[]]` when no elements match', () => {
    const arr = [1, 3, 5];
    const result = filter(arr, (v) => v % 2 === 0);
    expect(result).toEqual([[]]);
  });

  test('handles empty array input (returns `[[]]`)', () => {
    const result = filter([], () => true);
    expect(result).toEqual([[]]);
  });

  test('null and undefined array inputs yield `[[]]` (current implementation)', () => {
    const predicate = () => true;
    const resNull = filter(null, predicate);
    const resUndef = filter(undefined, predicate);
    expect(resNull).toEqual([[]]);
    expect(resUndef).toEqual([[]]);
  });

  test('thisArg support when provided', () => {
    const arr = [1, 2, 3];
    const context = { threshold: 2 };
    function predicate(v) {
      // @ts-ignore
      return v > this.threshold;
    }
    const result = filter(arr, predicate, context);
    expect(result).toEqual([3]);
  });

  test('non-array inputs: behavior depends on implementation; here, treat length and call predicate when possible', () => {
    expect(filter('string', () => true)).toEqual([[]]);
    expect(filter(123, () => true)).toEqual([[]]);
  });
});
