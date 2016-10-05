import { BufferFlags } from '../flags';
import arrayBufferSupport from './arrayBufferSupport';

export default (function(): any {
    if (arrayBufferSupport === BufferFlags.BUFFER_NONE) {
        return undefined;
    }
    // ES6 typed arrays
    if (arrayBufferSupport === BufferFlags.BUFFER_CURRENT) {
        return ArrayBuffer.isView;
    }
})();
