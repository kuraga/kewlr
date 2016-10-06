import compareReferences from './compareReferences';
import { isArray, supportsMap, supportsSet, objectToString } from '../constants';
import { BufferFlags } from '../flags';
import isBuffer from './isBuffer';
import arrayBufferSupport from './arrayBufferSupport';
import isView from './isView';
import { argsTag, numberTag, weakMapTag, promiseTag, weakSetTag, errorTag, stringTag, boolTag } from '../tags';
import equalIterators from './equalIterators';
import compareRegEx from './compareRegEx';
import { EqualFunc } from '../layout';
import isIterable from './isIterable';
import equalView from './equalView';
import isObjectLike from './isObjectLike';
import isStrict from './isStrict';
import equalArrays from './equalArrays';

/**
 * Compare objects with identical prototypes
 *
 * @typedef {true | false} equalProtos
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalProtos(actual: any, expected: any, isEqual: EqualFunc, context: number, left?: any, right?: any): true | false {

    // RegExp
    if (actual instanceof RegExp) {
        return compareRegEx(actual, expected);
    }

    // Date
    if (actual instanceof Date) {
        return actual.getTime() === expected.getTime();
    }

    if (isArray(actual)) {
        return equalArrays(actual, expected, isEqual, context, left, right);
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

    // There is a known bug with the 'typeof' operator in in Safari 9 which returns 'object' for
    // typed array and other constructors. And there is also an issue with Safari 10 for window.Proxy.
    // This will not affect 'kewlr' coz we are only returning false after checking for iterabels.
    if (typeof actual === 'function') {
        if (isIterable(actual)) {
            return equalIterators(actual, expected, isEqual, context, left, right);
        }
        return false;
    }

    const actualTag = objectToString.call(actual);

    // Numbers, Booleans, WeakMap, WeakSet, Promise, Error and String

    switch (actualTag) {
        case stringTag:
          return actual == (expected + '');
        case numberTag:
        case boolTag:
            // Coerce booleans to `1` or `0`
          return isStrict(+actual, +expected);
        case weakMapTag:
        case weakSetTag:
        case promiseTag:
        case errorTag:
            return isStrict(actual, expected);
        default:
            if (actualTag === argsTag) {
                if (objectToString.call(expected) !== argsTag || actual.length !== expected.length) {
                    return false;
                }

                if (actual.length === 0) {
                    return true;
                }
            } else if (objectToString.call(expected) === argsTag) {
                return false;
            }

            return compareReferences(actual, expected, isEqual, context, left, right);
    }
}

export default equalProtos;