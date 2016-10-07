import { BufferFlags } from '../flags';
import arrayBufferSupport from '../support/arrayBufferSupport';

/**
 * Determine if 'isView' is supported or not
 *
 * @typedef {any} isView
 */
export default (function(): any {
    switch (arrayBufferSupport) {
        case BufferFlags.BUFFER_CURRENT: return ArrayBuffer.isView;
        case BufferFlags.BUFFER_NONE: return undefined;
        default: return undefined;
    }
})();
