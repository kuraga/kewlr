import { supportSymbolIterator, symbolIterator } from '../constants';

/**
 * Check if a object is iterable
 *
 * @typedef {true | false} isIterable
 * @property {[any]} [obj]
 */
function isIterable(obj: any): true | false {
    return supportSymbolIterator
        ? typeof obj[symbolIterator] === 'function'
        : typeof obj['@@iterator'] === 'function';
}

export default isIterable;