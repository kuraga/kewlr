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
export function loose(actual: any, expected: any): true | false {
    return looseEqual(actual, expected, looseEqual, ModeFlags.LOOSE_MODE);
};

/**
 * Loose mode
 *
 * @typedef {true | false} strict
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
export function strict(actual: any, expected: any): true | false {
    return strictEqual(actual, expected, strictEqual, ModeFlags.STRICT_MODE | ModeFlags.LOOSE_MODE);
};