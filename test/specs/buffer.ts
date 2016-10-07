import { strict, shallow } from '../../src/kewlr';
const expect = chai.expect;

if (typeof Buffer === 'function') {

    describe('Buffer', () => {

        it('should compare buffers', () => {
            let buffer = new Buffer([1]);
            expect(strict(buffer, new Buffer([2]))).to.be.false;
            expect(strict(buffer, new Uint8Array([1]))).to.be.false;
            expect(strict(buffer, new Buffer([1]))).to.be.true;
        });

        it('should match empty Buffers', () => {
            expect(strict(new Buffer([]), new Buffer([]))).to.be.true;
            expect(strict(new Buffer([]), new Buffer([]))).to.be.true;
        });

        it('should fail against anything other than a buffer', () => {
            expect(strict(new Buffer('abc'), [97, 98, 99])).to.be.false;
            expect(strict(new Buffer('abc'), {0: 97, 1: 98, 2: 99, length: 3})).to.be.false;
            expect(strict([97, 98, 99], new Buffer('abc'))).to.be.false;
            expect(strict({ 0 : 97, 1 : 98, 2 : 99, length: 3 }, new Buffer('abc'))).to.be.false;
            expect(shallow([97, 98, 99], new Buffer('abc'))).to.be.true;
            expect(shallow({ 0 : 97, 1 : 98, 2 : 99, length: 3 }, new Buffer('abc'))).to.be.false;
        });

        it('should return true for same buffers', () => {
            expect(strict(new Buffer('xyz'), new Buffer('xyz'))).to.be.true;
            expect(shallow(new Buffer('xyz'), new Buffer('xyz'))).to.be.true;
        });

        it('should return false for different buffers', () => {
            expect(strict(new Buffer('abc'), new Buffer('xyz'))).to.be.false;
            expect(shallow(new Buffer('abc'), new Buffer('xyz'))).to.be.false;
        });

        it('should return true in strict mode and false in strict mode', () => {
            expect(strict(new Buffer([1, 2, 3]), new Uint8Array([1, 2, 3]))).to.be.false;
            expect(strict(new Buffer([1, 2, 3]), new Uint16Array([1, 2, 3]))).to.be.false;
        });

        if (ArrayBuffer) {

            it('should compare array buffers', () => {
                let buffer = new Int8Array([-1]).buffer;
                expect(strict(buffer, new ArrayBuffer(1))).to.be.false;
                expect(strict(buffer, new Uint8Array([255]).buffer)).to.be.true;
                expect(shallow(buffer, new ArrayBuffer(1))).to.be.false;
                expect(shallow(buffer, new Uint8Array([255]).buffer)).to.be.true;
            });
        }
        it('should notice different Buffers', () => {
            let b1 = new Buffer([0, 1, 2]);
            let b2 = new Buffer([0, 1, 2]);
            expect(strict(b1, b2)).to.be.true;
            let shortb = new Buffer([0, 1]);
            let longb = new Buffer(320);
            for (let i = 0; i < 160; i++) {
                longb.writeUInt16LE(i, i * 2);
            }
            expect(strict(
                {x: {y: {z: shortb}}},
                {x: {y: {z: longb}}}
            )).to.be.false;
            expect(strict(
                {x: {y: {z: shortb}}},
                {x: {y: {z: longb}}}
            )).to.be.false;
        });
        it('should match similar Buffers', () => {
            let b1 = new Buffer([0]);
            let b2 = new Buffer([0]);
            expect(strict(b1, b2)).to.be.true;
            let b3 = new Buffer([0, 1, 3]);
            let b4 = new Buffer([0, 1, 3]);
            expect(strict(b3, b4)).to.be.true;
        });
        it('should compare two array buffers', () => {
            let b1 = new Int32Array([1, 2, 3]),
                b2 = new Int32Array([1, 2, 3]),
                b3 = new Int32Array([1, 2]);
            expect(strict(b1, b1)).to.be.true;
            expect(strict(b1, b2)).to.be.true;
            expect(strict(b1, b3)).to.be.false;
            expect(shallow(b1, b1)).to.be.true;
            expect(shallow(b1, b2)).to.be.true;
            expect(shallow(b1, b3)).to.be.false;
        });

        [
            [new Uint8Array(1e5), new Uint8Array(1e5)],
            [new Uint16Array(1e5), new Uint16Array(1e5)],
            [new Uint32Array(1e5), new Uint32Array(1e5)],
            [new Uint8ClampedArray(1e5), new Uint8ClampedArray(1e5)],
            [new Int8Array(1e5), new Int8Array(1e5)],
            [new Int16Array(1e5), new Int16Array(1e5)],
            [new Int32Array(1e5), new Int32Array(1e5)],
            [new Float32Array(1e5), new Float32Array(1e5)],
            [new Float64Array(1e5), new Float64Array(1e5)],
            [new Int16Array(256), new Uint16Array(256)],
            [new Int16Array([256]), new Uint16Array([256])],
            [new Float32Array([+0.0]), new Float32Array([-0.0])],
            [new Float64Array([+0.0]), new Float32Array([-0.0])],
            [new Float64Array([+0.0]), new Float64Array([-0.0])],
            [new Uint8Array([1, 2, 3, 4]).subarray(1), new Uint8Array([2, 3, 4])],
            [new Uint16Array([1, 2, 3, 4]).subarray(1), new Uint16Array([2, 3, 4])],
            [new Uint32Array([1, 2, 3, 4]).subarray(1, 3), new Uint32Array([2, 3])]
        ].forEach((arrayPair: any) => {
            it('equalArrayPairs - shallow mode', () => {
                expect(shallow(arrayPair[0], arrayPair[1])).to.be.true;
            });
        });

        [
            [new Uint8Array(1e5), new Uint8Array(1e5)],
            [new Uint16Array(1e5), new Uint16Array(1e5)],
            [new Uint32Array(1e5), new Uint32Array(1e5)],
            [new Uint8ClampedArray(1e5), new Uint8ClampedArray(1e5)],
            [new Int8Array(1e5), new Int8Array(1e5)],
            [new Int16Array(1e5), new Int16Array(1e5)],
            [new Int32Array(1e5), new Int32Array(1e5)],
            [new Float32Array(1e5), new Float32Array(1e5)],
            [new Float64Array(1e5), new Float64Array(1e5)],
            [new Float32Array([+0.0]), new Float32Array([-0.0])],
            [new Float64Array([+0.0]), new Float64Array([-0.0])],
            [new Uint8Array([1, 2, 3, 4]).subarray(1), new Uint8Array([2, 3, 4])],
            [new Uint16Array([1, 2, 3, 4]).subarray(1), new Uint16Array([2, 3, 4])],
            [new Uint32Array([1, 2, 3, 4]).subarray(1, 3), new Uint32Array([2, 3])]
        ].forEach((arrayPair: any) => {
            it('equalArrayPairs - strict mode', () => {
                expect(strict(arrayPair[0], arrayPair[1])).to.be.true;
            });
        });
        const notEqualArrayPairs = [
            [new Uint8Array(2), new Uint8Array(3)],
            [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
            [new Uint8ClampedArray([300, 2, 3]), new Uint8Array([300, 2, 3])],
            [new Uint16Array([2]), new Uint16Array([3])],
            [new Uint16Array([0]), new Uint16Array([256])],
            [new Int16Array([0]), new Uint16Array([256])],
            [new Int16Array([-256]), new Uint16Array([0xff00])], // same bits
            [new Int32Array([-256]), new Uint32Array([0xffffff00])], // ditto
            [new Float32Array([0.1]), new Float32Array([0.0])],
            [new Float64Array([0.1]), new Float64Array([0.0])]
        ];
        notEqualArrayPairs.forEach((arrayPair: any) => {
            it('notEqualArrayPairs', () => {
                expect(strict(arrayPair[0], arrayPair[1])).to.false;
                expect(shallow(arrayPair[0], arrayPair[1])).to.false;
            });
        });
    });
}