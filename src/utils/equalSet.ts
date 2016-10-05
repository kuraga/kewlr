import { EqualFunc } from '../layout';
import equalArrays from './equalArrays';
import convertToArray from './convertToArray';

/**
 * Compare equality between two Set()
 *
 * @typedef {true | false} equalSet
 * @property {[Set]} [actual]
 * @property {Set} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {Set[]} [left]
 * @property {Set[]} [right]
 */
function equalSet<T, V>(
    actual: Set<T>,
    expected: Set<V>,
    isEqual: EqualFunc,
    context: number,
    left: Set<T>[],
    right: Set<V>[]
): true | false {
        return equalArrays(convertToArray(actual), convertToArray(expected), isEqual, context, left, right);
}

export default equalSet;