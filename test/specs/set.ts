import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

describe('Set()', () => {

    it('should return true for sets with circular references', () => {
        let set1 = new Set()
        let set2 = new Set()
        set1.add(set1)
        set2.add(set2)
        expect(strict( set1, set2)).to.be.true;
        set1.add(1);
        set2.add(2);
        expect(strict( set1, set2)).to.be.false;
    });

    it('should work with Set', () => {
        const a = new Set();
        a.add('a');
        const b = new Set();
        b.add('a');
        expect(strict(a, b)).to.be.true;
    });

    it('should compare Set()', () => {
        let set1 = new Set();
        let set2 = new Set();
        set1.add(1);
        set2.add(2);
        expect(strict(set1, set2)).to.be.false;
        set1.add(2);
        set2.add(1);
        expect(strict(set1, set2)).to.be.false;
        set1.delete(1);
        set1.add(1);
        expect(strict(set1, set2)).to.be.true;
        set2.delete(1);
        expect(strict(set1, set2)).to.be.false;
        set1.clear();
        set2.clear();
    });

    it('should compare two Set()', () => {
        let s1 = new Set();
        let s2 = new Set();
        s1.add(1);
        s1.add(2);
        s2.add(1);
        expect(strict(s1, s1)).to.be.true;
        expect(strict(s1, s1)).to.be.true;
        expect(strict(s1, s2)).to.be.false;
        expect(shallow(s1, s1)).to.be.true;
        expect(shallow(s1, s1)).to.be.true;
        expect(shallow(s1, s2)).to.be.false;
    });

    it('should return true empty sets', () => {
        expect(strict(new Set(), new Set())).to.be.true;
        expect(strict(new Set(), new Set())).to.be.true;
    });

    it('should return false for sets with shallowly same primitive value', () => {
        expect(strict( new Set([1, 'foo']), new Set(['1', 'foo']))).to.be.false;
        expect(shallow( new Set([1, 'foo']), new Set(['1', 'foo']))).to.be.true;
    });

    it('should return true for sets with same primitive values', () => {
        expect(strict(new Set(['foo', 'bar']), new Set(['foo', 'bar']))).to.be.true;
        expect(strict(new Set(['foo', 'bar']), new Set(['foo', 'bar']))).to.be.true;
    });
    it('should return true for sets with strictly same primitive value', () => {
        expect(strict(new Set([1, 'foo']), new Set(['1', 'foo']))).to.be.false;
    });
    it('should return false for different size', () => {
        expect(strict(new Set([1]), new Set())).to.be.false;
        expect(strict(new Set([1]), new Set())).to.be.false;
    });

    it('should return false for sets with different primitive values', () => {
        expect(strict(new Set(['foo', 'bar']), new Set(['bar', 'bar']))).to.be.false;
        expect(strict(new Set(['foo', 'bar']), new Set(['bar', 'bar']))).to.be.false;
    });

    it('returns true for Sets with same entries', () => {
        let setA = new Set();
        let setB = new Set();
        setA.add('a');
        setA.add('b');
        setA.add('c');
        setB.add('c');
        setB.add('b');
        setB.add('a');
        expect(strict(setA, setB)).to.be.false;
    });

    it('returns false for Sets with different entries', () => {
        let setA = new Set();
        let setB = new Set();
        setA.add('a');
        setA.add('b');
        setA.add('c');
        setB.add('d');
        setB.add('e');
        setB.add('f');
        expect(strict(setA, setB)).to.be.false;
    });
    it('returns false for Sets with different entries', () => {
        let setA = new Set();
        let setB = new Set();
        setA.add('a');
        setA.add('b');
        setA.add('c');
        setB.add('d');
        setB.add('e');
        setB.add('f');
        expect(strict(setA[Symbol.iterator](), setB[Symbol.iterator]())).to.be.false;
    });

    it('returns false for Sets with different entries', function () {
        let setA = new Set();
        let setB = new Set();
        setA.add('a');
        setA.add('b');
        setA.add('c');
        setB.add('d');
        setB.add('e');
        setB.add('f');
        expect(strict(setA, setB)).to.be.false;
    });
    it('should return true for sets with many same primitive values', () => {
        expect(strict(new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]), new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]))).to.be.true;
        expect(strict(new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]), new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]))).to.be.true;
    });
    it('should return false for sets with many different primitive values', () => {
        expect(strict(
            new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]),  new Set(['foo', 'bar', 'bar', 2, '15', 2, false, 4]))).to.be.false;
        expect(shallow(
            new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]),  new Set(['foo', 'bar', 'bar', 2, '15', 2, false, 4]))).to.be.true;
    });
    it('should return false for sets with many different primitive values', () => {
        expect(strict(
            new Set(['foo']),  new Set(['foo', 'bar', 'bar', 2, '15', 2, false, 4]))).to.be.false;
    });
    it('should return true for sets with identical values', () => {
        let setObj = {foo: 'bar'};
        expect(shallow( new Set([setObj, 'bar']),  new Set([setObj, 'bar']))).to.be.true;
        expect(strict( new Set([setObj, 'bar']),  new Set([setObj, 'bar']))).to.be.true;
    });

    it('should return true for sets with structurally similar values', () => {
        expect(shallow(new Set([{foo: 'bar'}, 'bar']), new Set([{foo: 'bar'}, 'bar']))).to.be.true;
        expect(strict(new Set([{foo: 'bar'}, 'bar']), new Set([{foo: 'bar'}, 'bar']))).to.be.true;
    });
    it('should return false for sets with structurally different values', () => {
        expect(strict(new Set([{foo: 'bar'}, 'bar']), new Set([{bar: 'foo'}, 'bar']))).to.be.false;
    });
    it('should return false for sets with many different primitive values', () => {
        expect(strict(
            new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]),  new Set(['foo', 'bar', 'bar', 2, '15', 2, false, 4]))).to.be.false;
        expect(shallow(
            new Set(['foo', 'bar', 'bar', 1, 1, 2, true, 3]),  new Set(['foo', 'bar', 'bar', 2, '15', 2, false, 4]))).to.be.true;
    });

    it('should return false for sets sets with different primitive values', () => {
        expect(strict(new Set([{foo: 'bar'}, 'bar']), new Set([{bar: 'foo'}, 'bar']))).to.be.false;
        expect(strict(new Set([{foo: 'bar'}, 'bar']), new Set([{bar: 'foo'}, 'bar']))).to.be.false;
    });
    it('should return `false` for for non-sets', () => {
        expect(strict(new Set(), new Date())).to.be.false;
        expect(strict(new Set(), [1, 2, 3])).to.be.false;
        expect(strict(new Set(), Error)).to.be.false;
        expect(strict(new Set(), Date())).to.be.false;
        expect(strict(new Set(), Error)).to.be.false;
        expect(strict(new Set(), /x/)).to.be.false;
        expect(strict(new Set(), 'a')).to.be.false;
        expect(strict(new Set(), 1)).to.be.false;
    });

    it('should compare sets with circular references', () => {

        let set1 = new Set();
        let set2 = new Set();

        set1.add(set1);
        set2.add(set2);
        expect(strict(set1, set2)).to.be.true;

        set1.add(1);
        set2.add(2);
        expect(strict(set1, set2)).to.be.false;
    });
});