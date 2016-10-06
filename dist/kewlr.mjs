/* global Buffer, Symbol, Uint8Array, DataView, ArrayBuffer, ArrayBufferView, Map, Set */
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @typedef {true | false} isObject
 * @property {[any]} [value]
 */
function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @typedef {true | false} isObjectLike
 * @property {[any]} [value]
 */
function isObjectLike(value) {
    return value != null && typeof value == 'object';
}

/** Built-in value references. */
/** Built-in value references. */ var isArray = Array.isArray;
var getPrototype = Object.getPrototypeOf;
var hasOwn = Object.prototype.hasOwnProperty;
var objectToString = Object.prototype.toString;
var supportsIterator = typeof Symbol === 'function' && Symbol.iterator !== undefined;
var symbolIterator = supportsIterator ? Symbol.iterator : undefined;
var supportsUnicode = hasOwn.call(RegExp.prototype, 'unicode');
var supportsSticky = hasOwn.call(RegExp.prototype, 'sticky');
var supportsMap = typeof Map === 'function';
var supportsSet = typeof Set === 'function';
var iterator = supportsIterator ? symbolIterator : false;
// core-js' symbols are objects, and some old versions of V8 erroneously had
// `typeof Symbol() === "object"`.
var symbolsAreObjects = typeof Symbol === 'function' && typeof Symbol() === 'object';

/**
 * Check if a object is iterable
 *
 * @typedef {true | false} isIterable
 * @property {[any]} [obj]
 */
function isIterable(obj) {
    return supportsIterator
        ? typeof obj[symbolIterator] === 'function'
        : typeof obj['@@iterator'] === 'function';
}

/**
 * Compare two Map() values
 *
 * @typedef {true | false} compareValues
 * @property {[Map]} [actual]
 * @property {Map} [expected]
 * @property {any[]} [actualKeys]
 * @property {any[]} [expectedKeys]
 * @property {number} [end]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {Map[]} [left]
 * @property {Map[]} [right]
 */
function compareValues(actual, expected, actualKeys, expectedKeys, end, isEqual, context, left, right) {
    for (var i = end - 1; i >= 0; i--) {
        if (!isEqual(actual.get(actualKeys[i]), expected.get(expectedKeys[i]), isEqual, context, left, right)) {
            return false;
        }
    }
    return true;
}

/**
 * Check if equal keys
 *
 * @typedef {true | false} equalKeys
 * @property {[any]} [actualKeys]
 * @property {any} [expectedKeys]
 * @property {number} [start]
 * @property {number} [end]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalKeys(actualKeys, expectedKeys, start, end, isEqual, context, left, right) {
    for (var i = start + 1; i < end; i++) {
        var key = expectedKeys[i];
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

/**
 * Converts `map` or `set` to its key-value pairs.
 *
 * @typedef {Map | Set} convertToArray
 * @property {[ Map[] | Set[]]} [obj]
 */
function convertToArray(obj) {
    var list = new Array(obj.size);
    var i = 0;
    var iter = obj.keys();
    for (var next = iter.next(); !next.done; next = iter.next()) {
        list[i++] = next.value;
    }
    return list;
}

/**
 * Compare equality between two Map()
 *
 * @typedef {true | false} equalMap
 * @property {[Map<any, any>]} [actual]
 * @property {Map<any, any>} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {Map<any, any>[]} [left]
 * @property {Map<any, any>[]} [right]
 */
function equalMap(actual, expected, isEqual, context, left, right) {
    var end = actual.size;
    var actualKeys = convertToArray(actual);
    var expectedKeys = convertToArray(expected);
    var index = 0;
    while (index !== end && isEqual(actualKeys[index], expectedKeys[index], isEqual, context, left, right)) {
        index++;
    }
    if (index === end) {
        return compareValues(actual, expected, actualKeys, expectedKeys, end, isEqual, context, left, right);
    }
    // Don't compare the same key twice
    if (!equalKeys(expectedKeys[index], actualKeys, index, end, isEqual, context, left, right)) {
        return false;
    }
    // If the above fails, while we're at it, let's sort them as we go, so the key order matches.
    while (++index < end) {
        var key = expectedKeys[index];
        // Adapt if the keys are already in order, which is frequently the
        // case.
        if (!isEqual(key, actualKeys[index], isEqual, context, left, right) &&
            !equalKeys(key, actualKeys, index, end, isEqual, context, left, right)) {
            return false;
        }
    }
    return compareValues(actual, expected, actualKeys, expectedKeys, end, isEqual, context, left, right);
}

/**
 * Check if two arrays has equal keys
 *
 * @typedef {true | false} equalArrays
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function equalArrays(actual, expected, isEqual, context, left, right) {
    var count = actual.length;
    // compare array lengths to determine if a deep comparison is necessary.
    if (count !== expected.length) {
        return false;
    }
    if (count === 0) {
        return true;
    }
    // deep compare the contents, ignoring non-numeric properties.
    while (count--) {
        if (!isEqual(actual[count], expected[count], isEqual, context, left, right)) {
            return false;
        }
    }
    return true;
}

/**
 * Compare equality between two Set()
 *
 * @typedef {true | false} equalSet
 * @property {[Set]} [actual]
 * @property {Set} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {Set[]} [left]
 * @property {Set[]} [right]
 */
function equalSet(actual, expected, isEqual, context, left, right) {
    return equalArrays(convertToArray(actual), convertToArray(expected), isEqual, context, left, right);
}

/**
 * Convert iterators to an array
 *
 * @typedef {any[]} iteratorToArray
 * @property {[any]} [iterator]
 */
function iteratorToArray(generator) {
    var generatorResult = generator.next();
    var accumulator = [generatorResult.value];
    while (generatorResult.done === false) {
        generatorResult = generator.next();
        accumulator.push(generatorResult.value);
    }
    return accumulator;
}

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
function equalIterators(actual, expected, isEqual, context, left, right) {
    var actualArray = iteratorToArray(actual[iterator]());
    var expectedArray = iteratorToArray(expected[iterator]());
    if (actualArray.length !== expectedArray.length) {
        return false;
    }
    if (actualArray.length === 0) {
        return true;
    }
    for (var i = actualArray.length - 1; i >= 0; i--) {
        if (isEqual(actualArray[i], expectedArray[i], isEqual, context, left, right) === false) {
            return false;
        }
    }
    return true;
}

/**
 * Compare inner values
 *
 * @typedef {true | false} compareInnerValues
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function compareInnerValues(actual, expected, isEqual, context, left, right) {
    if (context & 131072 /* EQUAL_PROTO */) {
        // NOTE!! Due to circular references Map(), Set() must be in this function. Moving it will increase performance, but will
        // also cause tons of circular reference issues
        if (supportsMap && actual instanceof Map) {
            return actual.size === expected.size && equalMap(actual, expected, isEqual, context, left, right);
        }
        if (supportsSet && actual instanceof Set) {
            return actual.size === expected.size && equalSet(actual, expected, isEqual, context, left, right);
        }
        if (isIterable(actual)) {
            return equalIterators(actual, expected, isEqual, context, left, right);
        }
    }
    var actualKeys = Object.keys(actual);
    var expectedKeys = Object.keys(expected);
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (actualKeys.length !== expectedKeys.length) {
        return false;
    }
    // Shortcut if there's nothing to match
    if (actualKeys.length === 0) {
        return true;
    }
    var index = actualKeys.length;
    while (index--) {
        var key = actualKeys[index];
        if (!(hasOwn.call(expected, key))) {
            return false;
        }
    }
    // equivalent values for every corresponding key, and possibly expensive deep test
    while (++index < actualKeys.length) {
        var key$1 = actualKeys[index];
        var actualValue = actual[key$1];
        var expectedValue = expected[key$1];
        if (!(actualValue === expectedValue || isEqual(actualValue, expectedValue, isEqual, context, left, right))) {
            return false;
        }
    }
    return true;
}

/**
 * Gets the index at which the first occurrence of `value` is found in `array`.
 * If `fromIndex` is negative, it's used as the offset from the end of `array`.
 *
 * @typedef {any} indexOf
 * @property {[any[]]} [array]
 * @property {any} [value]
 * @property {number} [fromIndex]
 */
function indexOf(array, value) {
    var length = array ? array.length : 0;
    var index = -1;
    var isReflexive = value === value;
    while (++index < length) {
        var other = array[index];
        if ((isReflexive ? other === value : other !== other)) {
            return index;
        }
    }
    return -1;
}

/**
 * Compare circular references
 *
 * @typedef {true | false} compareReferences
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function compareReferences(actual, expected, isEqual, context, left, right) {
    // Check for circular references after the first level, where it's
    // redundant. Note that they have to point to the same level to actually
    // be considered deeply equal.
    if (!(context & 65536 /* LOOSE_MODE */)) {
        var leftIndex = indexOf(left, actual);
        var rightIndex = indexOf(right, expected);
        if (leftIndex !== rightIndex) {
            return false;
        }
        if (leftIndex >= 0) {
            return true;
        }
        left.push(actual);
        right.push(expected);
        var result = compareInnerValues(actual, expected, isEqual, context, left, right);
        left.pop();
        right.pop();
        return result;
    }
    else {
        return compareInnerValues(actual, expected, isEqual, context & ~65536 /* LOOSE_MODE */, [actual], [expected]);
    }
}

/**
 * Check if Buffer are supported
 *
 * @typedef {any} bufferSupport
 */
var bufferSupport = (function () {
    var FakeBuffer = function FakeBuffer () {};

    FakeBuffer.prototype.isBuffer = function isBuffer () {
        return true;
    };
    if (typeof Buffer !== 'function') {
        return 8 /* BUFFER_POLYFILL */;
    }
    if (typeof Buffer.isBuffer !== 'function') {
        return 8 /* BUFFER_POLYFILL */;
    }
    // Avoid the polyfill
    if (Buffer.isBuffer(new FakeBuffer())) {
        return 8 /* BUFFER_POLYFILL */;
    }
    return 4 /* BUFFER_NATIVE */;
})();
/**
 * Check if isPolyfilledFastBuffer are used
 *
 * @typedef {true | false} isPolyfilledFastBuffer
 * @property {[any]} [Object]
 */
function isPolyfilledFastBuffer(object) {
    var Buffer = object.constructor;
    if (typeof Buffer !== 'function') {
        return false;
    }
    if (typeof Buffer.isBuffer !== 'function') {
        return false;
    }
    return Buffer.isBuffer(object);
}
/**
 * isBuffer
 *
 * @typedef {true | false} isBuffer
 * @property {[any]} [Object]
 */
function isBuffer(object) {
    if (bufferSupport === 4 /* BUFFER_NATIVE */ && Buffer.isBuffer(object)) {
        return true;
    }
    if (isPolyfilledFastBuffer(object)) {
        return true;
    }
    if (typeof object.slice !== 'function') {
        return false;
    }
    var slice = object.slice(0, 0);
    return slice != null && isPolyfilledFastBuffer(slice);
}

/**
 * Check if arrayBuffer are supported
 *
 * @typedef {any} arrayBufferSupport
 */
var arrayBufferSupport = (function () {
    if (typeof Uint8Array !== 'function') {
        return 1 /* BUFFER_NONE */;
    }
    if (typeof DataView !== 'function') {
        return 1 /* BUFFER_NONE */;
    }
    if (typeof ArrayBuffer !== 'function') {
        return 1 /* BUFFER_NONE */;
    }
    if (typeof ArrayBuffer.isView === 'function') {
        return 2 /* BUFFER_CURRENT */;
    }
    return 1 /* BUFFER_NONE */;
})();

/**
 * Determine if 'isView' is supported or not
 *
 * @typedef {any} isView
 */
var isView = (function () {
    if (arrayBufferSupport === 1 /* BUFFER_NONE */) {
        return undefined;
    }
    // ES6 typed arrays
    if (arrayBufferSupport === 2 /* BUFFER_CURRENT */) {
        return ArrayBuffer.isView;
    }
})();

var argsTag = '[object Arguments]';
var numberTag = '[object Number]';
var weakMapTag = '[object WeakMap]';
var promiseTag = '[object Promise]';
var weakSetTag = '[object WeakSet]';
var errorTag = '[object Error]';
var boolTag = '[object Boolean]';
var stringTag = '[object String]';

/**
 * Compare two regExp values and check if they are equivalent.
 *
 * @typedef {true | false} compareRegEx
 * @property {[RegExp]} [actual]
 * @property {RegExp} [expected]
 */
function compareRegEx(actual, expected) {
    return actual.source === expected.source &&
        actual.global === expected.global &&
        actual.ignoreCase === expected.ignoreCase &&
        actual.multiline === expected.multiline &&
        actual.lastIndex === expected.lastIndex &&
        (!supportsUnicode || actual.unicode === expected.unicode) &&
        // Only supported by Firefox
        (!supportsSticky || actual.sticky === expected.sticky);
}

/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @typedef {true | false} strict
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function isStrict(actual, expected) {
    return actual === expected || (actual !== actual && expected !== expected);
}

/**
 * Compare two Buffer.isView() values
 *
 * @typedef {true | false} equalView
 * @property {[Uint8Array]} [actual]
 * @property {Uint8Array} [expected]
 */
function equalView(actual, expected) {
    var count = actual.length;
    if (count !== expected.length) {
        return false;
    }
    while (count) {
        count--;
        if (!isStrict(actual[count], expected[count])) {
            return false;
        }
    }
    return true;
}

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
function equalProtos(actual, expected, isEqual, context, left, right) {
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
    if ((arrayBufferSupport & 1 /* BUFFER_NONE */) === 0) {
        if (actual instanceof DataView) {
            if ((actual.byteLength != expected.byteLength) ||
                (actual.byteOffset != expected.byteOffset)) {
                return false;
            }
            return equalView(new Uint8Array(actual.buffer, actual.byteOffset, actual.byteLength), new Uint8Array(expected.buffer, expected.byteOffset, expected.byteLength));
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
    var actualTag = objectToString.call(actual);
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
            // use of 'isObjectLike' check, fixes Safari issues with arguments
            if (isObjectLike(actual) && actualTag === argsTag) {
                if (objectToString.call(expected) !== argsTag || actual.length !== expected.length) {
                    return false;
                }
                if (actual.length === 0) {
                    return true;
                }
            }
            else if (objectToString.call(expected) === argsTag) {
                return false;
            }
            return compareReferences(actual, expected, isEqual, context, left, right);
    }
}

/**
 * Performs a loose [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @typedef {true | false} loose
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function isLoose(actual, expected) {
    return actual == expected || (actual !== actual && expected !== expected);
}

/**
 * Compare objects with different prototypes. This is only done for the 'loose' mode.
 * Only return false for the 'strict' mode.
 *
 * @typedef {true | false} differentProtos
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function differentProtos(actual, expected, isEqual, context, left, right) {
    // core.js and older V8 compat
    if (symbolsAreObjects) {
        if (actual instanceof Symbol || expected instanceof Symbol) {
            return false;
        }
    }
    // Only return 'false' for strict mode
    if (context & 32768 /* STRICT_MODE */) {
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
    if ((arrayBufferSupport & 1 /* BUFFER_NONE */) === 0) {
        if (actual instanceof DataView) {
            if ((actual.byteLength != expected.byteLength) ||
                (actual.byteOffset != expected.byteOffset)) {
                return false;
            }
            return equalView(new Uint8Array(actual.buffer, actual.byteOffset, actual.byteLength), new Uint8Array(expected.buffer, expected.byteOffset, expected.byteLength));
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
    // There is a known bug with the 'typeof' operator in in Safari 9 which returns 'object' for
    // typed array and other constructors. And there is also an issue with Safari 10 for window.Proxy.
    // This will not affect 'kewlr' coz we are only returning false after checking for iterabels.
    if (typeof actual === 'function') {
        if (isIterable(actual)) {
            return equalIterators(actual, expected, isEqual, context, left, right);
        }
        return false;
    }
    var actualTag = objectToString.call(actual);
    switch (actualTag) {
        case stringTag:
            return actual == (expected + '');
        case numberTag:
        case boolTag:
            // Coerce booleans to `1` or `0`
            return isLoose(+actual, +expected);
        case weakMapTag:
        case weakSetTag:
        case promiseTag:
            return isLoose(actual, expected);
        default:
            if (actualTag === errorTag) {
                return actual.name == actual.name && actual.message == actual.message;
            }
            else if (isObjectLike(actual) && actualTag === argsTag) {
                if (isObjectLike(expected) && objectToString.call(expected) != argsTag || actual.length !== expected.length) {
                    return false;
                }
                if (actual.length === 0) {
                    return true;
                }
            }
            else if (objectToString.call(expected) == argsTag) {
                return false;
            }
            return compareReferences(actual, expected, isEqual, context, left, right);
    }
}

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
function deepEqual(actual, expected, isEqual, context, left, right) {
    return context & 32768 /* STRICT_MODE */ && getPrototype(actual) === getPrototype(expected)
        ? equalProtos(actual, expected, isEqual, context | 131072 /* EQUAL_PROTO */, left, right)
        : differentProtos(actual, expected, isEqual, context, left, right);
}

/**
 * Loose equal
 *
 * @typedef {true | false} looseEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function looseEqual(actual, expected, isEqual, context, left, right) {
    // All identical values are equivalent, as determined by ==.
    if (actual == expected) {
        return true;
    }
    // NaNs are equal
    if (actual !== actual) {
        return expected !== expected;
    }
    if (actual == null || expected == null) {
        return false;
    }
    if ((!isObject(actual) && !isObjectLike(expected))) {
        return actual === expected;
    }
    return deepEqual(actual, expected, isEqual, context, left, right);
}

/**
 * Strict equal
 *
 * @typedef {true | false} strictEqual
 * @property {[any]} [actual]
 * @property {any} [expected]
 * @property {EqualFunc} [isEqual]
 * @property {number} [context]
 * @property {any} [left]
 * @property {any} [right]
 */
function strictEqual(actual, expected, isEqual, context, left, right) {
    // All identical values are equivalent, as determined by ===.
    if (actual === expected) {
        return true;
    }
    // NaNs are equal
    if (actual !== actual) {
        return expected !== expected;
    }
    if (actual == null || expected == null) {
        return false;
    }
    if ((!isObject(actual) && !isObjectLike(expected))) {
        return actual === expected;
    }
    return deepEqual(actual, expected, isEqual, context, left, right);
}

/**
 * Loose mode
 *
 * @typedef {true | false} loose
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function loose(actual, expected) {
    return looseEqual(actual, expected, looseEqual, 65536 /* LOOSE_MODE */);
}

/**
 * Strict mode
 *
 * @typedef {true | false} strict
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function strict(actual, expected) {
    return strictEqual(actual, expected, strictEqual, 32768 /* STRICT_MODE */ | 65536 /* LOOSE_MODE */);
}

export { loose, strict };
