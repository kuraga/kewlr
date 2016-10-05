import { BufferFlags } from '../flags';

export default (() => {
    if (typeof Uint8Array !== 'function') {
        return BufferFlags.BUFFER_NONE;
    }
    if (typeof DataView !== 'function') {
        return BufferFlags.BUFFER_NONE;
    }
    if (typeof global.ArrayBuffer !== 'function') {
        return BufferFlags.BUFFER_NONE;
    }
    if (typeof global.ArrayBuffer.isView === 'function') {
        return BufferFlags.BUFFER_CURRENT;
    }
    return BufferFlags.BUFFER_NONE;
})();