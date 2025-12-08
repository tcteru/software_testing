import add from "../src/add.js";

describe('add (aligned to current createMathOperation behavior)', () => {
  test('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds negatives', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('handles zeros', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
  });

  test('string arguments produce concatenation, not numeric coercion', () => {
    expect(add('2', 3)).toBe('23');
    expect(add(2, '3')).toBe('23');
    expect(add('2', '3')).toBe('23');
  });

  test('non-numeric input yields string concatenation', () => {
    expect(add('a', 1)).toBe('a1');
    expect(add({}, 1)).toBe('[object Object]1');
  });

  test('undefined handling follows defaultValue and passthrough rules', () => {
    expect(add(undefined, undefined)).toBe(0); // defaultValue
    expect(add(5, undefined)).toBe(5);
    expect(add(undefined, 7)).toBe(7);
  });
});
