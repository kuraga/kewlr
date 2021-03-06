import { EqualFunc } from '../layout';

/**
 * Check if two arrays has equal keys
 *
 * @typedef {true | false} equalArrays
 * @property {[any]} [actual]
 * @property {any[]} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalArrays(actual: any, expected: any, isEqual: EqualFunc, context: number, left: any, right: any): true | false {

    let count = actual.length;

     // Same number of own properties
    if (count !== expected.length) {
        return false;
    }

    // Equal if both are empty
    if (count === 0) {
        return true;
    }

    // deep compare the contents, ignoring non-numeric properties.
    while (count--) {
        if (isEqual( actual[count], expected[count], isEqual, context, left, right) === false) {
            return false;
        }
    }
    return true;
}

export default equalArrays;