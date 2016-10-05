import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;
const mapObj = { foo: 'bar' };

describe('Map', () => {

    it('should compare ES6 maps correctly', () => {
        let a = new Map<string, string>()
        a.set('x', 'y1')
        let b = new Map<string, string>()
        b.set('x', 'y2')
        expect(strict(a.get('x'), b.get('x'))).to.be.false;
        expect(strict(a, b)).to.be.false;
    });

    it('should return true for maps with identical keys', () => {
        expect(strict(
            new Map([[mapObj, 'bar']]),
            new Map([[mapObj, 'bar']]),
        )).to.be.true;
    });

    it('should return true for maps with same primitive keys', () => {

        expect(strict(
            new Map([['foo', 'bar']]),
            new Map([['foo', 'bar']]),
        )).to.be.true;

        expect(loose(
            new Map([['foo', 'bar']]),
            new Map([['foo', 'bar']]),
        )).to.be.true;
    });

    it('should return true for maps with different primitive keys', () => {
        expect(strict(
            new Map([['foo', 'bar']]),
            new Map([['foo', 'foo']]),
        )).to.be.false;
    });

    it('should return false for maps with different primitive values', () => {
        expect(strict(
            new Map([['foo', 'bar']]),
            new Map([['bar', 'foo']]),
        )).to.be.false;
    });

    it('should return false for maps with different size', () => {
        expect(strict(
            new Map([['a', 1]]),
            new Map(),
        )).to.be.false;
    });

    it('should return false for maps with different value', () => {
        expect(strict(
            ([['a', 1]]),
            new Map([['a', 2]])
        )).to.be.false;
    });

    it('should return true for loose mode', () => {
        expect(strict(
            new Map([['a', 1]]), new Map([['a', '1']])
        )).to.be.false;
    });

    it('should return false for strict mode', () => {
        expect(strict(
            new Map([['a', 1]]), new Map([['a', '1']])
        )).to.be.false;
    });

    it('should return true for maps with different order', () => {
        expect(strict(
            new Map([['a', 1], ['b', 2]]), new Map([['b', 2], ['a', 1]])
        )).to.be.true;
    });

    it('should return true for maps with different primitive both', () => {
        expect(strict(
            new Map([[1, 'foo']]),
            new Map([['1', 'foo']]),
        )).to.be.false;
    });

    it('should return false for maps with different primitive keys', () => {
        expect(strict(
            new Map([['foo', 'bar']]),
            new Map([['bar', 'bar']]),
        )).to.be.false;
    });

    it('should return true for maps with structurally similar  keys', () => {
        expect(strict(
            new Map([[{foo: 'bar'}, 'bar']]),
            new Map([[{foo: 'bar'}, 'bar']]),
        )).to.be.true;
        expect(loose(
            new Map([[{foo: 'bar'}, 'bar']]),
            new Map([[{foo: 'bar'}, 'bar']]),
        )).to.be.true;
    });

    it('should return true for maps with structurally different keys', () => {
        expect(strict(
            new Map([[{foo: 'bar'}, 'bar']]),
            new Map([[{bar: 'foo'}, 'bar']]),
        )).to.be.false;
    });

    it('should return true for maps with structurally similar values', () => {
        expect(strict(
            new Map([['bar', {foo: 'bar'}]]),
            new Map([['bar', {foo: 'bar'}]]),
        )).to.be.true;
    });

    it('should return false for maps with structurally different values', () => {
        expect(strict(
            new Map([['bar', {foo: 'bar'}]]),
            new Map([['bar', {bar: 'foo'}]]),
        )).to.be.false;
    });

    it('should return true for maps with structurally similar both', () => {
        expect(strict(
            new Map([[{foo: 'bar'}, {foo: 'bar'}]]),
            new Map([[{foo: 'bar'}, {foo: 'bar'}]]),
        )).to.be.true;
    });

    function bar(): any {}

    it('should return true for maps with inner functions', () => {
        expect(strict(
            new Map([[{foo: 'bar', bar: bar}, {foo: 'bar', bar: bar}]]),
            new Map([[{foo: 'bar', bar: bar}, {foo: 'bar', bar: bar}]])
        )).to.be.true;
    });

    it('should return true for maps maps with structurally similar values', () => {
        expect(strict(
            new Map([['bar', {foo: 'bar'}]]),
            new Map([['bar', {foo: 'bar'}]]),
        )).to.be.true;
    });

    it('should return false for maps maps with structurally different values', () => {
        expect(strict(
            new Map([['bar', {foo: 'bar'}]]),
            new Map([['bar', {bar: 'foo'}]]),
        )).to.be.false;
    });

    it('should return true for maps with structurally similar keys', () => {
        expect(strict(
            new Map([[{foo: 'bar'}, 'bar']]),
            new Map([[{foo: 'bar'}, 'bar']]),
        )).to.be.true;
    });

    it('should return true for maps with identical keys', () => {
        expect(strict(
            new Map([[mapObj, 'bar']]),
            new Map([[mapObj, 'bar']]),
        )).to.be.true;
    });

    it('should return false for maps with loosely same primitive both', () => {
        expect(strict(
            new Map([['1', 1]]),
            new Map([[1, '1']]),
        )).to.be.false;
    });

    it('should return true for maps with many same primitive keys', () => {
        expect(strict(
            new (Map as any)([['foo', 'bar'], ['bar', 1], [1, 2], [true, 3]]),
            new (Map as any)([['foo', 'bar'], ['bar', 1], [1, 2], [true, 3]]),
        )).to.be.true;
    });

    it('should return false for maps with loosely same primitive key', () => {
        expect(strict(
            new Map([[1, 'foo']]),
            new Map([['1', 'foo']]),
        )).to.be.false;
    });

    it('should return true for maps maps with structurally similar both', () => {
        expect(strict(
            new Map([[{foo: 'bar'}, {foo: 'bar'}]]),
            new Map([[{foo: 'bar'}, {foo: 'bar'}]])
        )).to.be.true;
    });

    it('should return false for maps with structurally different values', () => {
        expect(strict(
            new Map([['bar', {foo: 'bar'}]]),
            new Map([['bar', {bar: 'foo'}]]),
        )).to.be.false;
    });

    it('should return false for maps with many different primitive keys', () => {
        expect(strict(
            new (Map as any)([['foo', 'bar'], ['bar', 1], [1, 2], [true, 3]]),
            new (Map as any)([['foo', 'bar'], ['bar', 2], ['15', 2], [false, 4]]),
        )).to.be.false;
    });

    it('should return true for Maps with same entries', () => {
        let mapA = new Map();
        let mapB = new Map();
        mapA.set('a', 1);
        mapA.set('b', 2);
        mapA.set('c', 3);
        mapB.set('c', 3);
        mapB.set('b', 2);
        mapB.set('a', 1);
        expect(strict(mapA, mapB)).to.be.true;
    });

    it('should return false for Maps with different entries', () => {
        let mapA = new Map();
        let mapB = new Map();
        mapA.set('a', 1);
        mapB.set('a', 2);
        mapA.set('b', 3);
        mapB.set('b', 4);
        mapA.set('c', 5);
        mapB.set('c', 6);
        expect(strict(mapA.entries(), mapB.entries())).to.be.false;
    });

    it('should compare maps with circular references', () => {
        let map1: any = new Map();
        let map2: any = new Map();
        map1.set('a', map1);
        map2.set('a', map2);
        expect(strict(map1, map2)).to.be.true;
        map1.set('b', 1);
        map2.set('b', 2);
        expect(strict(map1, map2)).to.be.false;
        expect(loose(map1, map2)).to.be.true;
        expect(strict(map2, map1)).to.be.false;
    });

    it('should return `false` for for non-maps', () => {
        expect(strict(new Map(), new Date())).to.be.false;
        expect(strict(new Map(), [1, 2, 3])).to.be.false;
        expect(strict(new Map(), Error)).to.be.false;
        expect(strict(new Map(), Date())).to.be.false;
        expect(strict(new Map(), Error)).to.be.false;
        expect(strict(new Map(), /x/)).to.be.false;
        expect(strict(new Map(), 'a')).to.be.false;
        expect(strict(new Map(), 1)).to.be.false;
    });

    it('returns true for Map iterators with same entries', () => {
        let mapA = new Map();
        let mapB = new Map();
        mapA.set('a', 1);
        mapB.set('a', 1);
        mapA.set('b', 2);
        mapB.set('b', 2);
        mapA.set('c', 3);
        mapB.set('c', 3);
        expect(strict(mapA[Symbol.iterator](), mapB[Symbol.iterator]())).to.be.true;
    });

    it('should compare maps with circular references', () => {
        let map1 = new Map();
        let map2 = new Map();

        map1.set('a', map1);
        map2.set('a', map2);
        expect(strict(map1, map2)).to.be.true;

        map1.set('b', 1);
        map2.set('b', 2);
        expect(strict(map1, map2)).to.be.false;
    });
});