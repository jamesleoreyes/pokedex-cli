import { describe, expect, test } from "vitest";
import { cleanInput } from "../src/utils/format.js";

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
  {
    input: "UPPERCASE INPUT",
    expected: ["uppercase", "input"],
  },
  {
    input: "MiXeD CaSe WoRdS",
    expected: ["mixed", "case", "words"],
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