/**
 * isObjectLike
 *
 * @typedef {true | false} isObjectLike
 * @property {[any]} [value]
 */
function isObjectLike<T>(value: T): true | false {
    return value != null && typeof value == 'object';
}
export default isObjectLike;