import { generatorTag, funcTag, proxyTag } from '../tags';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @typedef {true | false} isFunction
 * @property {[string]} [tag]
 */
function isFunction(tag: string): true | false {
    return tag === funcTag      ||
           tag === generatorTag ||
           tag === proxyTag;
}

export default isFunction;