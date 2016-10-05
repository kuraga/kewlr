import { iterator } from '../constants';
import { EqualFunc } from '../layout';
import iteratorToArray from './iteratorToArray';

/**
 * equalIterators
 *
 * @typedef {true | false} equalIterators
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalIterators(actual: any, expected: any, isEqual: EqualFunc, context: number, left: any, right: any): true | false {

    let actualArray = iteratorToArray(actual[iterator]());
    let expectedArray = iteratorToArray(expected[iterator]());

    if (actualArray.length !== expectedArray.length) {
        return false;
    }

    if (actualArray.length === 0) {
        return true;
    }
    for (let i = actualArray.length - 1; i >= 0; i--) {
        if (isEqual(actualArray[i], expectedArray[i], isEqual, context, left, right) === false) {
            return false;
        }
    }
    return true;
}

export default equalIterators;