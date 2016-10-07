/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @typedef {true | false} isStrictEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function isStrictEqual(actual: any, expected: any): true | false {
  return actual === expected || (actual !== actual && expected !== expected);
}

export default isStrictEqual;