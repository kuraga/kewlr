import isStrictEqual from './isStrictEqual';

/**
 * Compare two Buffer.isView() values
 *
 * @typedef {true | false} equalView
 * @property {[Uint8Array]} [actual]
 * @property {Uint8Array} [expected]
 */
function equalView(actual: Uint8Array, expected: Uint8Array): true | false {
    let count = actual.length;
    if (count !== expected.length) {
        return false;
    }
    while (count) {
        count--;
        if (!isStrictEqual(actual[count], expected[count])) {
            return false;
        }
    }
    return true;
}
export default equalView;