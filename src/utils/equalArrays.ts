import { EqualFunc } from '../layout';

/**
 * Check if two arrays has equal keys
 *
 * @typedef {true | false} equalArrays
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalArrays(actual: any, expected: any, isEqual: EqualFunc, context?: number, left?: any, right?: any): any {

    let count = actual.length;

    // compare array lengths to determine if a deep comparison is necessary.
    if (count !== expected.length) {
        return false;
    }

    if (count === 0) {
        return true;
    }

    // deep compare the contents, ignoring non-numeric properties.
    while (count--) {
        if (!isEqual( actual[count], expected[count], isEqual, context, left, right)) {
            return false;
        }
    }
    return true;
}

export default equalArrays;