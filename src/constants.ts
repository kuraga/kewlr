/** Built-in value references. */
export const isArray = Array.isArray;
export const getPrototype = Object.getPrototypeOf;
export const hasOwn = Object.prototype.hasOwnProperty;
export const objectToString = Object.prototype.toString;
export const supportsIterator: any = typeof Symbol === 'function' && Symbol.iterator !== undefined;
export const symbolIterator: any = supportsIterator ? Symbol.iterator : undefined;
export const supportsUnicode = hasOwn.call(RegExp.prototype, 'unicode');
export const supportsSticky = hasOwn.call(RegExp.prototype, 'sticky');
export const supportsMap = typeof Map === 'function';
export const supportsSet = typeof Set === 'function';
export const iterator = supportsIterator ? symbolIterator : false;
// core-js' symbols are objects, and some old versions of V8 erroneously had
// `typeof Symbol() === "object"`.
export const symbolsAreObjects = typeof Symbol === 'function' && typeof Symbol() === 'object';
