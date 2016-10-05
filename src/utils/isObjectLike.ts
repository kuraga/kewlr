/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @typedef {true | false} isObjectLike
 * @property {[any]} [value]
 */
function isObjectLike<T>(value: T): true | false {
    return value != null && typeof value == 'object';
}
export default isObjectLike;