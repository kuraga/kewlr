import { BufferFlags } from '../flags';

/**
 * Check if Buffer are supported
 *
 * @typedef {any} arrayBufferSupport
 */
const bufferSupport = (function(): any {
    class FakeBuffer {
        isBuffer(): true {
        return true;
    }
}
    if (typeof Buffer !== 'function') {
        return BufferFlags.BUFFER_POLYFILL;
    }
    if (typeof Buffer.isBuffer !== 'function') {
        return BufferFlags.BUFFER_POLYFILL;
    }
    // Avoid the polyfill
    if (Buffer.isBuffer(new FakeBuffer())) {
        return BufferFlags.BUFFER_POLYFILL;
    }
    return BufferFlags.BUFFER_NATIVE;
})();

/**
 * Check if isPolyfilledFastBuffer are used
 *
 * @typedef {true | false} isPolyfilledFastBuffer
 * @property {[any]} [Object]
 */
function isPolyfilledFastBuffer(object: any): true | false {
    let Buffer = object.constructor;
    if (typeof Buffer !== 'function') {
        return false;
    }
    if (typeof Buffer.isBuffer !== 'function') {
        return false;
    }
    return Buffer.isBuffer(object);
}

/**
 * isBuffer
 *
 * @typedef {true | false} isBuffer
 * @property {[any]} [Object]
 */
function isBuffer(object: any): true | false {
    if (bufferSupport === BufferFlags.BUFFER_NATIVE && Buffer.isBuffer(object)) {
        return true;
    }
    if (isPolyfilledFastBuffer(object)) {
        return true;
    }
    if (typeof object.slice !== 'function') {
        return false;
    }
    const slice = object.slice(0, 0);
    return slice != null && isPolyfilledFastBuffer(slice);
}

export default isBuffer;