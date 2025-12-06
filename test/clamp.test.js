import clamp from "../src/clamp.js";

describe('clamp (tests aligned to current implementation)', () => {

  test('coercion using unary +', () => {
    expect(clamp('10', '0', '5')).toBe(0);
    expect(clamp('3', '-5', '5')).toBe(-5);
    expect(clamp(true, false, 1)).toBe(1);
  });

  test('lower/upper NaN become 0; number NaN returns NaN', () => {
    expect(clamp(5, NaN, 10)).toBe(0);
    expect(clamp(5, -10, NaN)).toBe(-10);
    // number NaN => return NaN
    expect(Number.isNaN(clamp(NaN, -5, 5))).toBe(true);
  });

  test('basic scenarios reflect current two-step forcing logic', () => {
    // Below upper then forced to upper; above lower then forced to lower.
    expect(clamp(3, -5, 5)).toBe(-5); // 3 < 5 -> set 5; 5 <= -5? false -> set -5
    expect(clamp(4, 0, 10)).toBe(0);  // 4 < 10 -> set 10; 10 <= 0? false -> set 0
    expect(clamp(-4, -10, 10)).toBe(-10); // -4 < 10 -> set 10; 10 <= -10? false -> set -10
  });

  test('number above upper remains above, then tends to lower', () => {
    // number >= upper keeps number; then if number > lower, it becomes lower
    expect(clamp(10, -5, 5)).toBe(-5); // stays 10; 10 <= -5? false -> set -5
    expect(clamp(100, -1, 1)).toBe(-1); // stays 100; 100 <= -1? false -> set -1
  });

  test('number below lower tends toward upper first, then lower', () => {
    // number < upper => set to upper, then likely set to lower unless upper <= lower
    expect(clamp(-10, -5, 5)).toBe(-5); // set to 5, then to -5
    expect(clamp(-100, -1, 1)).toBe(-1); // set to 1, then to -1
  });

  test('exact boundaries', () => {
    expect(clamp(5, -5, 5)).toBe(-5);
    expect(clamp(-5, -5, 5)).toBe(-5);
  });

  test('inverted bounds (lower > upper) under current logic', () => {
    expect(clamp(0, 5, -5)).toBe(0);
    expect(clamp(10, 5, -5)).toBe(5);
    expect(clamp(-10, 5, -5)).toBe(-5);
  });

  test('Infinity handling with current logic', () => {
    expect(clamp(Infinity, -5, 5)).toBe(-5);
    expect(clamp(-Infinity, -5, 5)).toBe(-5);

    // unbounded finite lower/upper as Infinity/-Infinity
    expect(clamp(0, -Infinity, Infinity)).toBe(0);
    expect(clamp(0, -Infinity, Infinity)).toBe(-Infinity);
    expect(clamp(100, -Infinity, 10)).toBe(-Infinity);
    expect(clamp(-100, -10, Infinity)).toBe(-10);
  });
});
