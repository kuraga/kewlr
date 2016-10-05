import buble from 'rollup-plugin-buble';

export default {
    entry: 'build/src/kewlr.js',
    plugins: [
        buble({}),
    ],
    banner: '/* global Buffer, Symbol, Uint8Array, DataView, ArrayBuffer, ArrayBufferView, Map, Set */',
    external: ['buffer', 'util'],
    targets: [
        {
            dest: 'dist/kewlr.js',
            format: 'cjs'
        },
          {
            dest: 'dist/kewlr.mjs',
            format: 'es'
        }

    ]
};