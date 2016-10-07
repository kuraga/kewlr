import isIterable from './isIterable';
import equalMap from './equalMap';
import equalSet from './equalSet';
import { isArray, hasOwn, supportsMap, supportsSet } from '../constants';
import { ModeFlags } from '../flags';
import { EqualFunc } from '../layout';
import equalIterators from './equalIterators';
import equalArrays from './equalArrays';

/**
 * Compare inner values
 *
 * @typedef {true | false} compareInnerValues
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function compareInnerValues(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {

    // Fixes circular reference issues with Arrays, Map() and Set() in strict mode
    if (context & ModeFlags.EQUAL_PROTO) {
        // 'strict mode' *only*
        if (context & ModeFlags.STRICT_MODE) {
            if (isArray(actual)) {
                return equalArrays(actual, expected, isEqual, context, left, right);
            }

            if (supportsMap && actual instanceof Map) {
                return actual.size === expected.size && equalMap(actual, expected, isEqual, context, left, right);
            }

            if (supportsSet && actual instanceof Set) {
                return actual.size === expected.size && equalSet(actual, expected, isEqual, context, left, right);
            }

            if (isIterable(actual)) {
                return equalIterators(actual, expected, isEqual, context, left, right);
            }
        }
    }
    const actualKeys: any = Object.keys(actual);
    const expectedKeys: any = Object.keys(expected);

    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (actualKeys.length !== expectedKeys.length) {
        return false;
    }

    // Shortcut if there's nothing to match
    if (actualKeys.length === 0) {
        return true;
    }

    let index = actualKeys.length;

    while (index--) {
        let key = actualKeys[index];
        if (!(hasOwn.call(expected, key))) {
            return false;
        }
    }

    // equivalent values for every corresponding key, and possibly expensive deep test
    while (++index < actualKeys.length) {
        let key = actualKeys[index];
        let actualValue = actual[key];
        let expectedValue = expected[key];
        if (!(actualValue === expectedValue || isEqual(actualValue, expectedValue, isEqual, context, left, right))) {
            return false;
        }
    }

    return true;
}

export default compareInnerValues;