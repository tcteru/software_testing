import clamp from "../src/clamp.js";

describe('clamp', () => {
  // Core behavior
  test('returns lower when number is below lower', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(-100, -1, 1)).toBe(-1);
  });

  test('returns upper when number is above upper', () => {
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(100, -1, 1)).toBe(1);
  });

  test('returns number itself when within bounds', () => {
    expect(clamp(0, -5, 5)).toBe(0);
    expect(clamp(3, -5, 5)).toBe(3);
    expect(clamp(-3, -5, 5)).toBe(-3);
  });

  // Edge boundaries
  test('handles exact boundary values', () => {
    expect(clamp(-5, -5, 5)).toBe(-5);
    expect(clamp(5, -5, 5)).toBe(5);
  });

  // Non-numeric inputs: current implementation coerces with unary +
  test('coerces inputs using +', () => {
    expect(clamp('10', '0', '5')).toBe(5);
    expect(clamp('3', '-5', '5')).toBe(3);
    expect(clamp(true, false, 1)).toBe(1); // +true=1, +false=0 -> clamp(1,0,1)=1
  });

  // NaN handling in current implementation:
  test('lower or upper NaN become 0; number NaN returns NaN', () => {
    expect(clamp(5, NaN, 10)).toBe(5); // lower -> 0, clamp(5,0,10)=5
    expect(clamp(5, -10, NaN)).toBe(0); // upper -> 0, clamp(5,-10,0)=0
    expect(Number.isNaN(clamp(NaN, -5, 5))).toBe(true); // number NaN -> returns NaN
  });

  // Infinity handling
  test('handles Infinity bounds and values', () => {
    expect(clamp(Infinity, -5, 5)).toBe(5);
    expect(clamp(-Infinity, -5, 5)).toBe(-5);
    expect(clamp(0, -Infinity, Infinity)).toBe(0);
    expect(clamp(100, -Infinity, 10)).toBe(10);
    expect(clamp(-100, -10, Infinity)).toBe(-10);
  });

  // Inverted bounds
  test('inverted bounds lower > upper should clamp to the range endpoints', () => {
    // Expected conventional behavior: treat lower=5, upper=-5 as [min=-5, max=5]
    // If the implementation doesn't normalize, these assertions will fail and expose the bug.
    expect(clamp(0, 5, -5)).toBe(0);   // within normalized [-5,5]
    expect(clamp(10, 5, -5)).toBe(5);  // above normalized upper
    expect(clamp(-10, 5, -5)).toBe(-5); // below normalized lower
  });

  // Regression tests
  test('regression: does not force upper when below upper, nor force lower when above lower', () => {
    expect(clamp(3, -5, 5)).toBe(3); // should not become 5 or -5
    expect(clamp(4, 0, 10)).toBe(4);
    expect(clamp(-4, -10, 10)).toBe(-4);
  });
});
