/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @typedef {true | false} isObject
 * @property {[any]} [value]
 */
function isObject<T>(value: T): true | false {
    const type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
export default isObject;