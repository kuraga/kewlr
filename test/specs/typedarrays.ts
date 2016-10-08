import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

describe('TypedArrays()', () => {

    if (typeof Int8Array === 'function') {
        it('should return true for same Int8Arrays values', () => {
            expect(strict(new Int8Array([1, 2, 3]), new Int8Array([1, 2, 3]))).to.be.true;
            expect(shallow(new Int8Array([1, 2, 3]), new Int8Array([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Arrays values', () => {
            expect(strict(new Int8Array([1, 2, 3]), new Int8Array([4, 5, 6]))).to.be.false;
            expect(shallow(new Int8Array([1, 2, 3]), new Int8Array([4, 5, 6]))).to.be.false;
        });
    }

     if (typeof Int16Array === 'function') {
        it('should return true for same Int16Array values', () => {
            expect(strict(new Int16Array([1, 2, 3]), new Int16Array([1, 2, 3]))).to.be.true;
            expect(shallow(new Int16Array([1, 2, 3]), new Int16Array([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Int32Array values', () => {
            expect(strict(new Int16Array([1, 2, 3]), new Int16Array([4, 5, 6]))).to.be.false;
            expect(shallow(new Int16Array([1, 2, 3]), new Int16Array([4, 5, 6]))).to.be.false;
        });
    }

     if (typeof Uint8ClampedArray === 'function') {
        it('should return true for same Uint8Arrays values', () => {
            expect(strict(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([1, 2, 3]))).to.be.true;
            expect(shallow(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Arrays values', () => {
            expect(strict(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([4, 5, 6]))).to.be.false;
            expect(shallow(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([4, 2, 3]))).to.be.false;
        });
    }

     if (typeof Uint16Array === 'function') {
        it('should return true for same Uint16Array values', () => {
            expect(strict(new Uint16Array([1, 2, 3]), new Uint16Array([1, 2, 3]))).to.be.true;
            expect(shallow(new Uint16Array([1, 2, 3]), new Uint16Array([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Arrays values', () => {
            expect(strict(new Uint16Array([1, 2, 3]), new Uint16Array([4, 5, 6]))).to.be.false;
            expect(shallow(new Uint16Array([1, 2, 3]), new Uint16Array([4, 2, 3]))).to.be.false;
        });
    }

     if (typeof Uint32Array === 'function') {
        it('should return true for same Uint32Array values', () => {
            expect(strict(new Uint32Array([1, 2, 3]), new Uint32Array([1, 2, 3]))).to.be.true;
            expect(shallow(new Uint32Array([1, 2, 3]), new Uint32Array([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Arrays values', () => {
            expect(strict(new Uint32Array([1, 2, 3]), new Uint32Array([4, 5, 6]))).to.be.false;
            expect(shallow(new Uint32Array([1, 2, 3]), new Uint32Array([4, 2, 3]))).to.be.false;
        });
    }

     if (typeof Float32Array === 'function') {
        it('should return true for same Uint8Arrays values', () => {
            expect(strict(new Float32Array([1, 2, 3]), new Float32Array([1, 2, 3]))).to.be.true;
            expect(shallow(new Float32Array([1, 2, 3]), new Float32Array([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Arrays values', () => {
            expect(strict(new Float32Array([1, 2, 3]), new Float32Array([4, 5, 6]))).to.be.false;
            expect(shallow(new Float32Array([1, 2, 3]), new Float32Array([4, 5, 6]))).to.be.false;
        });
    }

     if (typeof Float64Array === 'function') {
        it('should return true for same Uint8Arrays values', () => {
            expect(strict(new Float64Array([1, 2, 3]), new Float64Array([1, 2, 3]))).to.be.true;
            expect(shallow(new Float64Array([1, 2, 3]), new Float64Array([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Arrays values', () => {
            expect(strict(new Float64Array([1, 2, 3]), new Float64Array([4, 5, 6]))).to.be.false;
            expect(shallow(new Float64Array([1, 2, 3]), new Float64Array([4, 5, 6]))).to.be.false;
        });
    }

     if (typeof Uint8ClampedArray === 'function') {
        it('should return true for same Uint8Arrays values', () => {
            expect(strict(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([1, 2, 3]))).to.be.true;
            expect(shallow(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([1, 2, 3]))).to.be.true;
        });

        it('should return false for different Uint8Array valuess', () => {
            expect(strict(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([4, 5, 6]))).to.be.false;
            expect(shallow(new Uint8ClampedArray([1, 2, 3]), new Uint8ClampedArray([4, 2, 3]))).to.be.false;
        });
    }
});