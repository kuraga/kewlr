import { ModeFlags } from '../flags';
import compareInnerValues from './compareInnerValues';
import indexOf from './indexOf';
import { EqualFunc } from '../layout';

/**
 * Compare circular references
 *
 * @typedef {true | false} compareReferences
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function compareReferences<T, S>(actual: T, expected: S, isEqual: EqualFunc, context: number, left: any, right: any): true | false {

    // Check for circular references after the first level, where it's
    // redundant. Note that they have to point to the same level to actually
    // be considered deeply equal.
    if (!(context & ModeFlags.LOOSE_MODE)) {
        let leftIndex = indexOf(left, actual);
        let rightIndex = indexOf(right, expected);
        if (leftIndex !== rightIndex) {
            return false;
        }
        if (leftIndex >= 0) {
            return true;
        }
        left.push(actual);
        right.push(expected);
        let result = compareInnerValues(actual, expected, isEqual, context, left, right);
        left.pop();
        right.pop();
        return result;
    } else {
        return compareInnerValues(actual, expected, isEqual, context & ~ModeFlags.LOOSE_MODE, [actual], [expected]);
    }
}
export default compareReferences;