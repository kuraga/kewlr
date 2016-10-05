import { BufferFlags } from '../flags';

/**
 * Check if arrayBuffer are supported
 *
 * @typedef {any} arrayBufferSupport
 */
export default (() => {
    if (typeof Uint8Array !== 'function') {
        return BufferFlags.BUFFER_NONE;
    }
    if (typeof DataView !== 'function') {
        return BufferFlags.BUFFER_NONE;
    }
    if (typeof ArrayBuffer !== 'function') {
        return BufferFlags.BUFFER_NONE;
    }
    if (typeof ArrayBuffer.isView === 'function') {
        return BufferFlags.BUFFER_CURRENT;
    }
    return BufferFlags.BUFFER_NONE;
})();