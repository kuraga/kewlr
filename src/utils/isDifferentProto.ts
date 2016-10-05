import compareReferences from './compareReferences';
import { isArray, symbolsAreObjects, supportsMap, supportsSet, objectToString } from '../constants';
import isBuffer from './isBuffer';
import arrayBufferSupport from './arrayBufferSupport';
import isView from './isView';
import { BufferFlags, ModeFlags } from '../flags';
import equalView from './equalView';
import { EqualFunc } from '../layout';
import { argsTag, numberTag, weakMapTag, promiseTag, weakSetTag, errorTag, stringTag, boolTag } from '../tags';
import loose from './loose';
import isIterable from './isIterable';
import equalIterators from './equalIterators';
import compareRegEx from './compareRegEx';
import isObjectLike from './isObjectLike';
import isFunction from './isFunction';

/**
 * Compare objects with different prototypes. This is only done for the 'loose' mode.
 * Only return false for the 'strict' mode.
 *
 * @typedef {true | false} isDifferentProto
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function isDifferentProto(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {
    // core.js and older V8 compat
    if (symbolsAreObjects) {
        if (actual instanceof Symbol || expected instanceof Symbol) {
            return false;
        }
    }

    // Only return 'false' for strict mode
    if (context & ModeFlags.STRICT_MODE) {
        return false;
    }

    // RegExp
    if (actual instanceof RegExp && expected instanceof RegExp) {
        return compareRegEx(actual, expected);
    }

    // isArray. Note! this will return true for' loose([], {})'
    if (isArray(actual) && isArray(expected)) {
        if (actual.length !== expected.length) {
            return false;
        }
        if (actual.length === 0) {
            return true;
        }
    }

    // DataView, ArrayBuffer and Buffer
    if ((arrayBufferSupport & BufferFlags.BUFFER_NONE) === 0) {
        if (actual instanceof DataView) {
            if ((actual.byteLength != expected.byteLength) ||
                (actual.byteOffset != expected.byteOffset)) {
                return false;
            }
            return equalView(
                new Uint8Array(actual.buffer, actual.byteOffset, actual.byteLength),
                new Uint8Array(expected.buffer, expected.byteOffset, expected.byteLength));
        }
        if (actual instanceof ArrayBuffer) {
            if ((actual.byteLength != expected.byteLength) ||
                !equalView(new Uint8Array(actual), new Uint8Array(expected))) {
                return false;
            }
            return true;
        }
        if (isBuffer(actual) || isView(actual)) {
            return equalView(actual, expected);
        }
    }

    // Date
    if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
    }

    // Map() && Set()
    if ((supportsMap && actual instanceof Map) || (supportsSet && actual instanceof Set)) {
        // check for different primitive keys
        if (actual.size !== expected.size) {
            return false;
        }
        if (actual.size === 0) {
            return true;
        }
    }

    // There is a known bug with the 'typeof' operator in in Safari 8-9 which returns 'object' for
    // typed array and other constructors. And there is also an issue with Safari 10 for window.Proxy.
    // We accept a little drop in performance and fix it!
    const actualTag = objectToString.call(actual);

    if (isFunction(actualTag)) {
        if (isIterable(actual)) {
            return equalIterators(actual, expected, isEqual, context, left, right);
        }
        return false;
    }

    switch (actualTag) {
        case numberTag:
        case boolTag:
        case weakMapTag:
        case weakSetTag:
        case promiseTag:
        case stringTag:
            return loose(actual, expected);
        default:
            if (actualTag === errorTag) {
                return actual.name == actual.name && actual.message == actual.message;
                // use of 'isObjectLike' check, fixes Safari issues with arguments
            } else if (isObjectLike(actual) && actualTag === argsTag) {
                if (isObjectLike(expected) && objectToString.call(expected) != argsTag || actual.length !== expected.length) {
                    return false;
                }

                if (actual.length === 0) {
                    return true;
                }
            } else if (objectToString.call(expected) == argsTag) {
                return false;
            }

            return compareReferences(actual, expected, isEqual, context, left, right);
    }
}

export default isDifferentProto;