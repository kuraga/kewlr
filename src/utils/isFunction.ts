function isFunction(tag: string): true | false {
    return tag === '[object Function]' ||
        tag === '[object GeneratorFunction]' ||
        tag === '[object Proxy]';
}
export default isFunction;