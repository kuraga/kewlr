import isObject from './utils/isObject';
import isObjectLike from './utils/isObjectLike';
import deepEqual from './deepEqual';
import { EqualFunc } from './layout';

/**
 * Loose equal
 *
 * @typedef {true | false} shallowEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function shallowEqual(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {

    // if they reference the same object in memory, then they are the same
    if (actual == expected) {
        return true;
    }

    if (actual == null || expected == null || (!isObject(actual) && !isObjectLike(expected))) {
        return actual != actual && expected != expected;
    }

    return deepEqual(actual, expected, isEqual, context, left, right);
}

export default shallowEqual;