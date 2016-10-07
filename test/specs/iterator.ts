import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

const symbolIterator: any = typeof Symbol === 'function' && Symbol.iterator !== undefined
    ? Symbol.iterator
    : '@@iterator';

class List {
    public items: any;
    constructor(items: any) {
        this.items = items;
    }
    symbolIterator () {
        return new ListIterator(this.items);
    }
}
class ListIterator {
    public items: any;
    public index: number;
    constructor(items: any) {
        this.items = items;
        this.index = 0;
    }
    next (): any {
        return {
            done: this.index === this.items.length,
            value: this.items[this.index++],
        }
    }
}
class Slice {
    public start: any;
    public end: any;
    public returned: any;
    constructor(start: any, end: any) {
        this.start = start;
        this.end = end;
        this.returned = 0;
    }
    symbolIterator () {
        return new Range(this);
    }
}
class Range {
    public slice: any;
    public index: any;
    constructor(slice: any) {
        this.slice = slice;
        this.index = slice.start;
    }
    next () {
        return {
            done: this.index >= this.slice.end,
            value: this.index++,
        }
    }
    return () {
        this.slice.returned++
    }
}
class Value {
    public value: any;
    constructor(value: any) {
        this.value = value;
    }
}
describe('Iterators',  () => {
    it('should return true for iterables with same prototypes', () => {
        let slice1 = new Slice(0, 10);
        let slice2 = new Slice(0, 10);
        expect(strict(slice1, slice2)).to.be.true;
        expect(shallow(slice1, slice2)).to.be.true;
    });
    it('should return true for iterables + same prototypes + different end times', () => {
        let slice1 = new Slice(0, 10);
        let slice2 = new Slice(0, 20);
        expect(strict(slice1, slice2)).to.be.false;
        expect(shallow(slice1, slice2)).to.be.false;
    });
    it('should return true for iterables deeply matched', () => {
        expect(strict(new List([
                new List([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, {value: 3}],
            ]))).to.be.true;
    });
    it('should return true for iterables deeply matched + type mismatch', () => {
        expect(strict( new List([
                new List([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });
    it('should return true for iterables + deeply matched + value mismatch', () => {
        expect(strict( new List([
                new List([1, 2, '3']),
                [1, 2, {what: 'ever'}],
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });
    it('should return true for iterables + deeply matched + left longer', () => {
        expect(strict(  new List([
                new List([1, 2, '3']),
                [1, 2, {value: 3}],
                new List([1, 2, 3]),
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
        expect(shallow(  new List([
                new List([1, 2, '3']),
                [1, 2, {value: 3}],
                new List([1, 2, 3]),
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });
    it('should return true for iterables + deeply matched + right longer', () => {
        expect(strict(  new List([
                new List([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
                new List([1, 2, 3]),
            ]))).to.be.false;
    });
    it('should return true for iterables + deeply matched + value mismatch', () => {
        expect(strict( new List([
                new List([1, 2, '3']),
                [1, 2, {what: 'ever'}],
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });
    it('should return true for iterables + deeply matched + value mismatch', () => {
        expect(strict( new List([
                new List([1, 2, '3']),
                [1, 2, {what: 'ever'}],
            ]),
            new List([
                new List([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });
    function list(items: any) {
        function result(): any {}
        (result as any)[symbolIterator] = () => {
            let index = 0;
            return {
                next: () => {
                    return {done: index >= items.length, value: items[index++]};
                },
            }
        }
        return result;
    }

    it('should return true for iterables deeply matched', () => {
        expect(strict(  list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
            ]))).to.be.true;

        expect(shallow(  list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
            ]))).to.be.true;
    });

    it('should return true for iterables deeply matched + type mismatch', () => {
        expect(strict(  list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            list([
                list([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });

    it('should return true for iterables + deeply matched + value mismatch', () => {
        expect(strict( list([
                list([1, 2, '3']),
                [1, 2, {what: 'ever'}],
            ]),
            list([
                list([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });

    it('should return true for iterables + deeply matched + left longer', () => {
        expect(strict(  list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
                list([1, 2, 3]),
            ]),
            list([
                list([1, 2, '3']),
                [1, 2, new Value(3)],
            ]))).to.be.false;
    });

    it('should return true for iterables + deeply matched + right longer', () => {
        expect(strict(  list([
                list([1, 2, '3']),
                [1, 2, {value: 3}],
            ]),
            list([
                list([1, 2, '3']),
                [1, 2, new Value(3)],
                list([1, 2, 3]),
            ]))).to.be.false;
    });

    it('returns true for two objects with same [Symbol.iterator] entries', () => {
        let testA = {};
        Object.defineProperty(testA, Symbol.iterator, { value: () => {
            let keys = [ 'a', 'b', 'c' ];
            let values = [ 'a', 'b', 'c' ];
            return {
                next: () => {
                    if (keys.length) {
                        return { value: [ keys.shift(), values.shift() ], done: false };
                    }
                    return { done: true };
                },
            };
        } });
        let testB = {};
        Object.defineProperty(testB, Symbol.iterator, { value: () => {
            let keys = [ 'a', 'b', 'c' ];
            let values = [ 'a', 'b', 'c' ];
            return {
                next: () => {
                    if (keys.length) {
                        return { value: [ keys.shift(), values.shift() ], done: false };
                    }
                    return { done: true };
                },
            };
        } });
        expect(shallow(testA, testB)).to.be.true;
        expect(strict(testA, testB)).to.be.true;
        expect(strict(testB, testA)).to.be.true;
    });

    it('returns false for two objects with different [Symbol.iterator] entries', () => {
        let testA = {};
        Object.defineProperty(testA, Symbol.iterator, { value: () => {
            let keys = [ 'a', 'b', 'c' ];
            let values = [ 'a', 'b', 'c' ];
            return {
                next: () => {
                    if (keys.length) {
                        return { value: [ keys.shift(), values.shift() ], done: false };
                    }
                    return { done: true };
                },
            };
        } });
        let testB = {};
        Object.defineProperty(testB, Symbol.iterator, { value: () => {
            let keys = [ 'a', 'b', 'c' ];
            let values = [ 'd', 'e', 'f' ];
            return {
                next: () => {
                    if (keys.length) {
                        return { value: [ keys.shift(), values.shift() ], done: false };
                    }
                    return { done: true };
                },
            };
        } });
        expect(strict(testA, testB)).to.be.false;
        expect(strict(testB, testA)).to.be.false;
        expect(shallow(testA, testB)).to.be.true;
        expect(shallow(testB, testA)).to.be.true;
    });
});

if (typeof String.prototype[Symbol.iterator] === 'function') {
    describe('string iterator', () => {
        it('returns true for Strings with same entries', () => {
            expect(strict('abc'[Symbol.iterator](), 'abc'[Symbol.iterator]())).to.be.true;
        });
        it('returns false for Strings with different entries', () => {
            expect(strict('abc'[Symbol.iterator](), 'def'[Symbol.iterator]())).to.be.false;
        });
    });
}

if (typeof Array.prototype.entries === 'function') {
    describe('array iterator (entries)', () => {
        it('returns true for Arrays with same entries', () => {
            expect(strict([ 1, 2, 3 ].entries(), [ 1, 2, 3 ].entries())).to.be.true;
        });
        it('returns false for Arrays with different entries', () => {
            expect(strict([ 1, 2, 3 ].entries(), [ 4, 5, 6 ].entries())).to.be.false;
            expect(shallow([ 1, 2, 3 ].entries(), [ 4, 5, 6 ].entries())).to.be.true;
        });
    });
}

if (typeof Symbol === 'function' && typeof Array.prototype[Symbol.iterator] === 'function') {
    describe('array iterator', () => {
        it('returns true for Arrays with same entries', () => {
            expect(strict([ 1, 2, 3 ][Symbol.iterator](), [ 1, 2, 3 ][Symbol.iterator]())).to.be.true;
        });
        it('returns false for Arrays with different entries', () => {
            expect(strict([ 1, 2, 3 ][Symbol.iterator](), [ 4, 5, 6 ][Symbol.iterator]())).to.be.false;
            expect(strict([ 4, 5, 6 ][Symbol.iterator](), [ 1, 2, 3 ][Symbol.iterator]())).to.be.false;
            expect(shallow([ 1, 2, 3 ][Symbol.iterator](), [ 4, 5, 6 ][Symbol.iterator]())).to.be.true;
            expect(shallow([ 4, 5, 6 ][Symbol.iterator](), [ 1, 2, 3 ][Symbol.iterator]())).to.be.true;
        });
    });
}

if (typeof Symbol === 'function' && typeof Map === 'function' && typeof Map.prototype[Symbol.iterator] === 'function') {
    describe('map iterator', () => {
        it('returns true for Map iterators with same entries', () => {
            const mapA = new Map();
            const mapB = new Map();
            mapA.set('a', 1);
            mapB.set('a', 1);
            mapA.set('b', 2);
            mapB.set('b', 2);
            mapA.set('c', 3);
            mapB.set('c', 3);
            expect(strict(mapA[Symbol.iterator](), mapB[Symbol.iterator]())).to.be.true;
            expect(strict(mapB[Symbol.iterator](), mapA[Symbol.iterator]())).to.be.true;
        });

        it('returns false for Map iterators with different entries', () => {
            const mapA = new Map();
            const mapB = new Map();
            mapA.set('a', 1);
            mapB.set('a', 2);
            mapA.set('b', 3);
            mapB.set('b', 4);
            mapA.set('c', 5);
            mapB.set('c', 6);
            expect(strict(mapA[Symbol.iterator](), mapB[Symbol.iterator]())).to.be.false;
            expect(shallow(mapA[Symbol.iterator](), mapB[Symbol.iterator]())).to.be.true;
        });
    });
}

if (typeof Map === 'function' && typeof Map.prototype.entries === 'function') {
    describe('map iterator (entries)', () => {
        it('returns true for Map iterators with same entries', () => {
            const mapA = new Map();
            const mapB = new Map();
            mapA.set('a', 1);
            mapB.set('a', 1);
            mapA.set('b', 2);
            mapB.set('b', 2);
            mapA.set('c', 3);
            mapB.set('c', 3);
            expect(strict(mapA.entries(), mapB.entries())).to.be.true;
            expect(strict(mapB.entries(), mapA.entries())).to.be.true;
        });

        it('returns false for Map iterators with different entries', () => {
            const mapA = new Map();
            const mapB = new Map();
            mapA.set('a', 1);
            mapB.set('a', 2);
            mapA.set('b', 3);
            mapB.set('b', 4);
            mapA.set('c', 5);
            mapB.set('c', 6);
            expect(strict(mapA.entries(), mapB.entries())).to.be.false;
            expect(strict(mapB.entries(), mapA.entries())).to.be.false;
            expect(shallow(mapA.entries(), mapB.entries())).to.be.true;
            expect(shallow(mapB.entries(), mapA.entries())).to.be.true;
        });
    });
}