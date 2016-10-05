export const enum ModeFlags {
    STRICT_MODE             = 1 << 15,
    LOOSE_MODE              = 1 << 16,
    EQUAL_PROTO             = 1 << 17,
}

export const enum BufferFlags {

    BUFFER_NONE             = 1,
    BUFFER_CURRENT          = 1 << 1,
    BUFFER_NATIVE           = 1 << 2,
    BUFFER_POLYFILL         = 1 << 3,
}