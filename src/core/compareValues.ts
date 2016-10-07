import { EqualFunc } from '../layout';

/**
 * Compare two Map() values
 *
 * @typedef {true | false} compareValues
 * @property {[Map]} [actual]
 * @property {Map} [expected]
 * @property {any[]} [actualKeys]
 * @property {any[]} [expectedKeys]
 * @property {number} [end]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {Map[]} [left]
 * @property {Map[]} [right]
 */
function compareValues<K, V>(
    actual: Map<K, V>,
    expected: Map<K, V>,
    actualKeys: any[],
    expectedKeys: any[],
    end: number,
    isEqual: EqualFunc,
    context: number,
    left: Map<K, V>[],
    right: Map<K, V>[]
): true | false {
     for (let i = end - 1; i >= 0; i--) {
        if (isEqual(actual.get(actualKeys[i]), expected.get(expectedKeys[i]), isEqual, context, left, right) === false) {
            return false;
        }
    }
    return true;
}
export default compareValues;