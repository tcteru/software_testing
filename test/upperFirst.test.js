import upperFirst from "../src/upperFirst.js";

describe('upperFirst (aligned to current implementation)', () => {
  test('uppercases the first character and leaves the rest', () => {
    expect(upperFirst('hello')).toBe('Hello');
    expect(upperFirst('world')).toBe('World');
  });

  test('handles already capitalized strings', () => {
    expect(upperFirst('Hello')).toBe('Hello');
  });

  test('handles mixed-case strings', () => {
    expect(upperFirst('hELLO')).toBe('HELLO');
    expect(upperFirst('jAvA')).toBe('JAvA');
  });

  test('handles empty string and nullish inputs', () => {
    expect(upperFirst('')).toBe('');
    expect(upperFirst(null)).toBe('');
    expect(upperFirst(undefined)).toBe('');
  });

  test('non-string truthy inputs throw (no implicit coercion)', () => {
    expect(() => upperFirst(123)).toThrow(TypeError);
    expect(() => upperFirst(true)).toThrow(TypeError);
  });
});
