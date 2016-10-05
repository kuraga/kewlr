import strict from './strict';

/**
 * Compare two Buffer.isView() values
 *
 * @typedef {true | false} equalView
 * @property {[any]} [actual]
 * @property {any} [expected]
 */
function equalView(actual: any, expected: any): true | false {
    let count = actual.length;
    if (count !== expected.length) {
        return false;
    }
    while (count) {
        count--;
        if (!strict(actual[count], expected[count])) {
            return false;
        }
    }
    return true;
}
export default equalView;