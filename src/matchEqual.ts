import isObject from './utils/isObject';
import isObjectLike from './utils/isObjectLike';
import deepEqual from './deepEqual';
import { EqualFunc } from './layout';

/**
 * Strict equal
 *
 * @typedef {true | false} matchEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function matchEqual(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {
    // if they reference the same object in memory, then they are the same
    if (actual === expected) {
        return actual !== 0 || 1 / actual === 1 / expected;
    }

    if (actual == null || expected == null || (!isObject(actual) && !isObjectLike(expected))) {
        return actual !== actual && expected !== expected;
    }

    return deepEqual(actual, expected, isEqual, context, left, right);
}

export default matchEqual;