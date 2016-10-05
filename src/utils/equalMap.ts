import { EqualFunc } from '../layout';
import compareValues from './compareValues';
import equalKeys from './equalKeys';
import convertToArray from './convertToArray';

/**
 * Compare equality between two Map()
 *
 * @typedef {true | false} equalMap
 * @property {[Map<any, any>]} [actual]
 * @property {Map<any, any>} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {Map<any, any>[]} [left]
 * @property {Map<any, any>[]} [right]
 */
function equalMap(
    actual: Map<any, any>,
    expected: Map<any, any>,
    isEqual: EqualFunc,
    context: number,
    left: Map<any, any>[],
    right: Map<any, any>[]
): true | false {

    let end = actual.size;
    let actualKeys:  any = convertToArray(actual);
    let expectedKeys: any = convertToArray(expected);
    let index = 0;

    while (index !== end && isEqual(actualKeys[index], expectedKeys[index], isEqual, context, left, right)) {
        index++;
    }

    if (index === end) {
        return compareValues(actual, expected, actualKeys, expectedKeys, end, isEqual, context, left, right);
    }

    // Don't compare the same key twice
    if (!equalKeys(expectedKeys[index], actualKeys, index, end, isEqual, context, left, right)) {
        return false;
    }

    // If the above fails, while we're at it, let's sort them as we go, so the key order matches.
    while (++index < end) {
        let key = expectedKeys[index];
        // Adapt if the keys are already in order, which is frequently the
        // case.
        if (!isEqual(key, actualKeys[index], isEqual, context, left, right) &&
            !equalKeys(key, actualKeys, index, end, isEqual, context, left, right)) {
            return false;
        }
    }
    return compareValues(actual, expected, actualKeys, expectedKeys, end, isEqual, context, left, right);
}

export default equalMap;