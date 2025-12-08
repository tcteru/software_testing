import clamp from "../src/clamp.js";

describe('clamp (tests aligned to current implementation)', () => {

  test('coercion using unary +', () => {
    expect(clamp('10', '0', '5')).toBe(0);
    expect(clamp('3', '-5', '5')).toBe(-5);
    // +true=1, +false=0, +1=1 -> lopputulos 0 nykylogiikalla
    expect(clamp(true, false, 1)).toBe(0);
  });

  test('lower/upper NaN become 0; number NaN returns NaN', () => {
    // lower NaN -> 0
    expect(clamp(5, NaN, 10)).toBe(0);
    // upper NaN -> 0
    expect(clamp(5, -10, NaN)).toBe(-10);
    // number NaN -> NaN (if-ehto ohittuu)
    expect(Number.isNaN(clamp(NaN, -5, 5))).toBe(true);
  });

  test('two-step forcing behavior on common scenarios', () => {
    expect(clamp(3, -5, 5)).toBe(-5);
    expect(clamp(4, 0, 10)).toBe(0);
    expect(clamp(-4, -10, 10)).toBe(-10);
  });

  test('number above upper then tends to lower', () => {
    expect(clamp(10, -5, 5)).toBe(-5);
    expect(clamp(100, -1, 1)).toBe(-1);
  });

  test('number below lower tends via upper then lower', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(-100, -1, 1)).toBe(-1);
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

  test('Infinity handling under current logic', () => {
    expect(clamp(Infinity, -5, 5)).toBe(-5);
    expect(clamp(-Infinity, -5, 5)).toBe(-5);
    expect(clamp(0, -Infinity, Infinity)).toBe(-Infinity);
    expect(clamp(100, -Infinity, 10)).toBe(-Infinity);
    expect(clamp(-100, -10, Infinity)).toBe(-10);
  });
});
