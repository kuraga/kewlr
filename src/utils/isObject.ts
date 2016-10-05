/**
 * isObject
 *
 * @typedef {true | false} isObject
 * @property {[any]} [value]
 */
function isObject<T>(value: T): true | false {
    const type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
export default isObject;