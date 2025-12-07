import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "foo",
    expected: ["foo"],
  },
  {
    input: "  multiple   spaces   between   words  ",
    expected: ["multiple", "spaces", "between", "words"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "variable spaces    between         words   ",
    expected: ["variable", "spaces", "between", "words"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    };
  });
});