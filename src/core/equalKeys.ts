import { EqualFunc } from '../layout';

/**
 * Check if an array contains equal keys
 *
 * @typedef {true | false} equalKeys
 * @property {[any[]]} [actualKeys]
 * @property {any[]} [expectedKeys]
 * @property {number} [start]
 * @property {number} [end]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any[]} [left]
 * @property {any[]} [right]
 */
function equalKeys(
    actualKeys: any[],
    expectedKeys: any[],
    start: number,
    end: number,
    isEqual: EqualFunc,
    context: number,
    left: any[],
    right: any[]
): true | false {
    for (let i = start + 1; i < end; i++) {
        let key = expectedKeys[i];
        if (isEqual(actualKeys, key, isEqual, context, left, right)) {
            while (i > start) {
                expectedKeys[i] = expectedKeys[--i];
            }
            expectedKeys[i] = key;
            return true;
        }
    }
    return false;
}

export default equalKeys;