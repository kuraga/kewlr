import shallowEqual from './shallowEqual';
import strictEqual from './strictEqual';
import matchEqual from './matchEqual';
import { ModeFlags } from './flags';

/**
 * Loose mode
 *
 * @typedef {true | false} loose
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
export function loose<T, S>(actual: T, expected: S): true | false {
    return shallowEqual(actual, expected, shallowEqual, ModeFlags.LOOSE_MODE);
};

/**
 * Match mode
 *
 * @typedef {true | false} match
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
export function match<T, S>(actual: T, expected: S): true | false {
    return matchEqual(actual, expected, strictEqual, ModeFlags.STRICT_MODE | ModeFlags.LOOSE_MODE);
};

/**
 * Strict mode
 *
 * @typedef {true | false} strict
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
export function strict<T, S>(actual: T, expected: S): true | false {
    return strictEqual(actual, expected, strictEqual, ModeFlags.STRICT_MODE | ModeFlags.LOOSE_MODE);
};