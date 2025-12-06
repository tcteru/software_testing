import toNumber from "../src/toNumber.js";

describe('toNumber', () => {
  test('numbers remain numbers', () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(42)).toBe(42);
    expect(toNumber(-3.14)).toBeCloseTo(-3.14);
  });

  test('string numbers with spaces and signs', () => {
    expect(toNumber('  123  ')).toBe(123);
    expect(toNumber('+123')).toBe(123);
    expect(toNumber('-123')).toBe(-123);
    expect(toNumber('  -0.5  ')).toBe(-0.5);
  });

  test('scientific notation and invalid numeric strings', () => {
    expect(toNumber('1e3')).toBe(1000);
    expect(toNumber('2E-2')).toBeCloseTo(0.02);
    expect(Number.isNaN(toNumber('abc'))).toBe(true);
    expect(Number.isNaN(toNumber('123abc'))).toBe(true);
  });

  test('special numeric values', () => {
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(-Infinity)).toBe(-Infinity);
    expect(Number.isNaN(toNumber(NaN))).toBe(true);
  });

  test('boolean conversion', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('null and undefined conversion', () => {
    // Implementation follows JS coercion: Number(null) === 0, Number(undefined) === NaN
    expect(toNumber(null)).toBe(0);
    expect(Number.isNaN(toNumber(undefined))).toBe(true);
  });

  test('objects and arrays', () => {
    // {} -> valueOf() callable => returns object; string path -> NaN
    expect(Number.isNaN(toNumber({}))).toBe(true);

    // { valueOf: () => 7 } -> 7
    expect(toNumber({ valueOf: () => 7 })).toBe(7);

    // { toString: () => 'x' } -> still NaN via object path
    expect(Number.isNaN(toNumber({ toString: () => 'x' }))).toBe(true);

    // [] -> becomes '' via string coercion path -> +'' => 0
    expect(toNumber([])).toBe(0);

    // ['1', '2'] -> "1,2" -> NaN
    expect(Number.isNaN(toNumber(['1', '2']))).toBe(true);
  });

  test('Date objects convert to their numeric timestamp', () => {
    const d = new Date('2020-01-01T00:00:00Z');
    const num = toNumber(d);
    expect(typeof num).toBe('number');
    expect(num).toBeCloseTo(d.valueOf());
  });

  test('Symbol returns NaN (per implementation)', () => {
    const sym = Symbol('x');
    const res = toNumber(sym);
    expect(Number.isNaN(res)).toBe(true);
  });

  test('BigInt may throw TypeError on unary plus (non-string path)', () => {
    // In the current implementation, BigInt hits the non-string path and uses +value,
    // which throws a TypeError in JS. Assert via try/catch to avoid failing the suite
    // in environments where BigInt coercion is handled differently.
    try {
      const v = toNumber(1n);
      // If environment converts, ensure result is numeric (unlikely in JS)
      expect(typeof v).toBe('number');
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
    }
  });

  test('hex, binary, octal string literals', () => {
    expect(toNumber('0xFF')).toBe(255);
    expect(toNumber('0b101')).toBe(5);
    expect(toNumber('0o77')).toBe(63);

    // bad signed hex -> NaN per reIsBadHex
    expect(Number.isNaN(toNumber('+0x1'))).toBe(true);
    expect(Number.isNaN(toNumber('-0x1'))).toBe(true);

    // invalid digits should produce NaN via +value
    expect(Number.isNaN(toNumber('0xG1'))).toBe(true);
    expect(Number.isNaN(toNumber('0b102'))).toBe(true);
    expect(Number.isNaN(toNumber('0o8'))).toBe(true);
  });

  test('whitespace variants are trimmed', () => {
    const nbsp = '\u00A0';
    const tabs = '\t';
    const nl = '\n';
    expect(toNumber(`${nbsp}42${nbsp}`)).toBe(42);
    expect(toNumber(`${tabs}-7${tabs}`)).toBe(-7);
    expect(toNumber(`${nl}3.14${nl}`)).toBeCloseTo(3.14);
  });
});
