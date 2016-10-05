import { EqualFunc } from '../layout';

/**
 * compareValues
 *
 * @typedef {true | false} compareValues
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [actualKeys]
 * @property {EqualFunc} [expectedKeys]
 * @property {EqualFunc} [end]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function compareValues(
    actual: any,
    expected: any,
    actualKeys: any,
    expectedKeys: any,
    end: any,
    isEqual: EqualFunc,
    context: any,
    left: any,
    right: any
): true | false {
     for (let i = end - 1; i >= 0; i--) {
        if (!isEqual(actual.get(actualKeys[i]), expected.get(expectedKeys[i]), isEqual, context, left, right)) {
            return false;
        }
    }
    return true;
}

export default compareValues;