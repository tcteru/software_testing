import capitalize from "../src/capitalize.js";

describe('capitalize', () => {
  test('basic uppercase to capitalized', () => {
    expect(capitalize('FRED')).toBe('Fred');
  });

  test('non-string inputs (aligned to current implementation)', () => {
    // toString(null) -> "null" => lowerCase -> "null" => upperFirst -> "Null"
    expect(capitalize(null)).toBe('Null');

    // toString(undefined) -> "undefined" => "Undefined"
    expect(capitalize(undefined)).toBe('Undefined');

    // number -> "123" => "123"
    expect(capitalize(123)).toBe('123');
  });

  test('already capitalized and mixed case', () => {
    expect(capitalize('hello WORLD')).toBe('Hello world');
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('HELLO')).toBe('Hello');
  });
});
