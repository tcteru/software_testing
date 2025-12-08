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

  // Jos jompikumpi on string, tulos on merkkijonojen yhdistys
  test('string arguments produce concatenation (not numeric coercion)', () => {
    expect(add('2', 3)).toBe('23');
    expect(add(2, '3')).toBe('23');
    expect(add('2', '3')).toBe('23');
  });

  // Ei-numeerinen mutta string -> yhdistyy
  test('non-numeric string still concatenates', () => {
    expect(add('a', 1)).toBe('a1');
    expect(add(1, 'a')).toBe('1a');
  });

  // Ei-string objekti + numero -> molemmat coerced numeroiksi -> NaN
  test('non-string object with number yields NaN', () => {
    expect(Number.isNaN(add({}, 1))).toBe(true);
    expect(Number.isNaN(add(1, {}))).toBe(true);
  });

  // Objekti + string -> string-polku: molemmat baseToString -> yhdistys
  test('object with string yields string concatenation', () => {
    expect(add({}, '1')).toBe('[object Object]1');
    expect(add('1', {})).toBe('1[object Object]');
  });

  // undefined-haarat
  test('undefined handling follows defaultValue and passthrough rules', () => {
    expect(add(undefined, undefined)).toBe(0);
    expect(add(5, undefined)).toBe(5);
    expect(add(undefined, 7)).toBe(7);
  });
});
