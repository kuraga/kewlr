import isEqualProto from './utils/isEqualProto';
import isDifferentProto from './utils/isDifferentProto';
import { getPrototype } from './constants';
import { ModeFlags } from './flags';
import { EqualFunc } from './layout';

/**
 * Deep equal main function
 *
 * @typedef {true | false} deepEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function deepEqual(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {

    // Check for an identical 'prototype' property.
    return context & ModeFlags.STRICT_MODE && getPrototype(actual) === getPrototype(expected)
        ? isEqualProto(actual, expected, isEqual, context | ModeFlags.EQUAL_PROTO, left, right)
        : isDifferentProto(actual, expected, isEqual, context, left, right);
}

export default deepEqual;