import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;
describe('strings', () => {

    it('returns true with arrays containing same literals', () => {
        expect(strict([ 1, 2, 3 ], [ 1, 2, 3 ])).to.be.true;
        expect(strict([ 'a', 'b', 'c' ], [ 'a', 'b', 'c' ])).to.be.true;
    });

    it('returns true given literal or constructor', () => {
        expect(strict([ 1, 2, 3 ], new Array(1, 2, 3))).to.be.true;
        expect(loose([ 1, 2, 3 ], new Array(1, 2, 3))).to.be.true;
    });

    it('returns false with arrays containing literals in different order', () => {
        expect(strict([ 3, 2, 1 ], [ 1, 2, 3 ])).to.be.false;
        expect(loose([ 3, 2, 1 ], [ 1, 2, 3 ])).to.be.false;
    });

    it('returns false for arrays of different length', () => {
        expect(strict(new Array(1), new Array(100))).to.be.false;
        expect(strict(new Array(100), new Array(1))).to.be.false;
        expect(loose(new Array(1), new Array(100))).to.be.false;
        expect(loose(new Array(100), new Array(1))).to.be.false;
    });

    it('should not compare objects with array', () => {
        expect(strict( { 0: 'a', 1: 'b', 2: 'c' }, ['a', 'b', 'c'])).to.be.false;
    });

    it('should return false for same contents, different order', () => {
        expect(strict( { a: 'a', b: 'b', c: 'c' }, { a: 'b', b: 'c', c: 'a' })).to.be.false;
        expect(loose( { a: 'a', b: 'b', c: 'c' }, { a: 'b', b: 'c', c: 'a' })).to.be.false;
    });

    it('should not compare objects with strings', () => {
        expect(strict( { 0: 'a', 1: 'b', 2: 'c' }, 'abc')).to.be.false;
        expect(strict('abc', { 0: 'a', 1: 'b', 2: 'c' })).to.be.false;
    });

    it('should treat arrays with identical values but different non-index properties as equal', () => {
        let array1: any = [1, 2, 3];
        let array2: any = [1, 2, 3];
        array1.every = array1.filter = array1.forEach =
            array1.indexOf = array1.lastIndexOf = array1.map =
                array1.some = array1.reduce = array1.reduceRight = null;
        array2.concat = array2.join = array2.pop =
            array2.reverse = array2.shift = array2.slice =
                array2.sort = array2.splice = array2.unshift = null;
        expect(strict(array1, array2)).to.be.true;
        array1 = [1, 2, 3];
        array1.a = 1;
        array2 = [1, 2, 3];
        array2.b = 1;
        expect(strict(array1, array2)).to.be.true;
        array1 = /c/.exec('abcde');
        array2 = ['c'];
        expect(strict(array1, array2)).to.be.true;
        expect(strict(array2, array1)).to.be.true;
        expect(loose(array1, array2)).to.be.false;
    });

    it('should return true for same array instance', () => {
        let arr = [1, 2];
        expect(strict(arr, arr)).to.be.true;
    });

    it('should return true for equal arrays with different Symbol',  () => {

        expect(strict([1, 'b', 'iii'], [1, 'b', 'iii'])).to.be.true;

        let s = Symbol();

        let arr1: any = [1, 2];
        let arr2: any = [1, 2];

        arr1[Symbol()] = arr2[Symbol()] = '3';
        expect(strict(arr1, arr2)).to.be.true;
    });

    it('should return true for equal arrays with Symbol',  () => {

        expect(strict([1, 'b', 'iii'], [1, 'b', 'iii'])).to.be.true;

        let s = Symbol();

        let arr1: any = [1, 2];
        let arr2: any = [1, 2];

        arr1[s] = arr2[s] = '3';
        expect(strict(arr1, arr2)).to.be.true;
    });

    it('should compare sparse arrays', () => {
        const array = Array(1);
        expect(strict(array, Array(1))).to.be.true;
        expect(strict(array, [undefined])).to.be.true;
        expect(loose(array, [undefined])).to.be.false;
        expect(loose([undefined], array)).to.be.false;
        // expect(strict([undefined], array)).to.be.false;
        expect(strict(array, Array(2))).to.be.false;
    });

    it('array that has properties', () => {
        let a1: any = [1, 2, 3];
        let a2: any = [1, 2, 3];
        a1.a = 'test';
        a1.b = true;
        a2.b = true;
        a2.a = 'test';
        expect(strict(Object.keys(a1), Object.keys(a2))).to.be.false;
        expect(strict(a1, a2)).to.be.true;
        expect(strict(a2, a1)).to.be.true;
    });

    it('should handle array with properties', () => {
        let a1: any = [1, 2, 3];
        let a2: any = [1, 2, 3];
        a1.a = 'test';
        a1.b = true;
        a2.b = true;
        a2.a = 'test';
        expect(strict(Object.keys(a1), Object.keys(a2))).to.be.false;
        expect(strict(a1, a2)).to.be.true;
    });
});