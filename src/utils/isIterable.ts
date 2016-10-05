import { supportsIterator, symbolIterator } from '../constants';

/**
 * isIterable
 *
 * @typedef {true | false} isIterable
 * @property {[any]} [obj]
 */
function isIterable(obj: any): true | false {
    return supportsIterator
        ? typeof obj[symbolIterator] === 'function'
        : typeof obj['@@iterator'] === 'function';
}

export default isIterable;