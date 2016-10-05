import { EqualFunc } from '../layout';

/**
 * equalKeys
 *
 * @typedef {true | false} equalKeys
 * @property {[any]} [current]
 * @property {any} [actualKeys]
 * @property {any} [start]
 * @property {any} [end]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalKeys(
    current: any,
    actualKeys: any,
    start: any,
    end: any,
    isEqual: EqualFunc,
    context: number,
    left: any,
    right: any
): true | false {
    for (let i = start + 1; i < end; i++) {
        let key = actualKeys[i];
        if (isEqual(current, key, isEqual, context, left, right)) {
            while (i > start) {
                actualKeys[i] = actualKeys[--i];
            }
            actualKeys[i] = key;
            return true;
        }
    }
    return false;
}

export default equalKeys;