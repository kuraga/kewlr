import isObject from './utils/isObject';
import isObjectLike from './utils/isObjectLike';
import deepEqual from './deepEqual';
import { EqualFunc } from './layout';

/**
 * Strict equal
 *
 * @typedef {true | false} strictEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function strictEqual(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {

    if (actual === expected) {
        return true;
    }

    // NaNs are equal
    if (actual !== actual) {
      return expected !== expected;
    }

    if (actual == null || expected == null) {
          return false;
    }

    if ((!isObject(actual) && !isObjectLike(expected))) {
        return actual === expected;
    }

    return deepEqual(actual, expected, isEqual, context, left, right);
}

export default strictEqual;