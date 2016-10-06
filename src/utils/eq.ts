/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @typedef {true | false} strict
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function isStrict(actual: any, expected: any): true | false {
  return actual === expected || (actual !== actual && expected !== expected);
}

export default isStrict;