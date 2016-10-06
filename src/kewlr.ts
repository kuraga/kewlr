import looseEqual from './looseEqual';
import strictEqual from './strictEqual';
import { ModeFlags } from './flags';

/**
 * Loose mode
 *
 * @typedef {true | false} loose
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
export function loose<T, S>(actual: T, expected: S): true | false {
    return looseEqual(actual, expected, looseEqual, ModeFlags.LOOSE_MODE);
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