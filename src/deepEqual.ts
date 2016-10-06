import equalProtos from './utils/equalProtos';
import differentProtos from './utils/differentProtos';
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
function deepEqual<K, V>(actual: K, expected: V, isEqual: EqualFunc, context: number, left?: K, right?: V): true | false {
    return context & ModeFlags.STRICT_MODE && getPrototype(actual) === getPrototype(expected)
        ? equalProtos(actual, expected, isEqual, context | ModeFlags.EQUAL_PROTO, left, right)
        : differentProtos(actual, expected, isEqual, context, left, right);
}

export default deepEqual;