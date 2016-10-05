import { BufferFlags } from '../flags';
import arrayBufferSupport from './arrayBufferSupport';

/**
 * Determine if 'isView' is supported or not
 *
 * @typedef {any} isView
 */
export default (function(): any {
    if (arrayBufferSupport === BufferFlags.BUFFER_NONE) {
        return undefined;
    }
    // ES6 typed arrays
    if (arrayBufferSupport === BufferFlags.BUFFER_CURRENT) {
        return ArrayBuffer.isView;
    }
})();
