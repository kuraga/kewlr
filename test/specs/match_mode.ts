import { chai as match } from '../../src/kewlr';
const expect = chai.expect;

describe('numbers', () => {

    it('returns true for same values - match mode (chai compatible)', () => {
        expect(match(-0, -0)).to.be.true;
        expect(match(+0, +0)).to.be.true;
        expect(match(0, 0)).to.be.true;
        expect(match(1, 1)).to.be.true;
        expect(match(Infinity, Infinity)).to.be.true;
        expect(match(-Infinity, -Infinity)).to.be.true;
    });

    it('returns false for literal vs instance with same value', () => {
        //     expect(match(1, new Number(1))).to.be.false;
    });

    it('returns true NaN vs NaN', function () {
        expect(match(NaN, NaN)).to.be.true;
    });

    it('returns false on numbers with different signs', () => {
        expect(match(-1, 1)).to.be.false;
        expect(match(-0, +0)).to.be.false;
        expect(match(-Infinity, Infinity)).to.be.false;
    });
});

describe('dates', function () {

    it('returns true given two dates with the same time', function () {
        var dateA = new Date();
        expect(match(dateA, new Date(dateA.getTime())), 'eql(dateA, new Date(dateA.getTime()))');
    });

    it('returns false given two dates with the different times', function () {
        var dateA = new Date();
        expect(match(dateA, new Date(dateA.getTime() + 1))).to.be.false;
    });
    describe('regexp', function () {
        it('returns true given two regexes with the same source', function () {
            expect(match(/\s/, /\s/)).to.be.true;
            expect(match(/\s/, new RegExp('\\s'))).to.be.true;
        });
    });

    it('returns false given two regexes with different source', function () {
        expect(match(/^$/, /^/)).to.be.false;
        expect(match(/^$/, new RegExp('^'))).to.be.false;
    });

});

describe('empty types', function () {

    it('returns true on two empty objects', function () {
        expect(match({}, {})).to.be.true;
    });

    it('returns true on two empty arrays', function () {
        expect(match([], [])).to.be.true;
    });

    it('returns false on different types', function () {
        expect(match([], {})).to.be.false;
    });
});

describe('class instances', function () {

    it('returns true given two empty class instances', function () {
        class BaseA {}
        expect(match(new BaseA(), new BaseA())).to.be.true;
    });

    it('returns true given two class instances with same properties', function () {
        class BaseA {
            public prop: any;
            constructor (prop: any) {
                this.prop = prop;
            }
        }

        expect(match(new BaseA(1), new BaseA(1))).to.be.true;
    });

    it('returns false given two class instances with different properties', function () {
        class BaseA {
            public prop: any;
            constructor (prop: any) {
                this.prop = prop;
            }
        }

        expect(match(new BaseA(1), new BaseA(2))).to.be.false;
    });

    it('returns false given two different empty class instances', function () {
        class BaseA {}
        class BaseB {}
        expect(match(new BaseA(), new BaseB())).to.be.false;
    });
});

describe('arrays', function () {

    it('returns true with arrays containing same literals', function () {
        expect(match([ 1, 2, 3 ], [ 1, 2, 3 ])).to.be.true;
        expect(match([ 'a', 'b', 'c' ], [ 'a', 'b', 'c' ])).to.be.true;
    });

    it('returns true given literal or constructor', function () {
        expect(match([ 1, 2, 3 ], new Array(1, 2, 3))).to.be.true;
    });

    it('returns false with arrays containing literals in different order', function () {
        expect(match([ 3, 2, 1 ], [ 1, 2, 3 ])).to.be.false;
    });

    it('returns false for arrays of different length', function () {
        expect(match(new Array(1), new Array(100))).to.be.false;
    });

});

describe('objects', function () {

    it('returns true with objects containing same literals', function () {
        expect(match({ foo: 1, bar: 2 }, { foo: 1, bar: 2 })).to.be.true;
    });

    it('returns true for deeply nested objects', function () {
        expect(match({ foo: { bar: 'foo' } }, { foo: { bar: 'foo' } })).to.be.true;
    });
});

describe('functions', function () {

    it('returns true for same functions', function () {
        function foo() {}
        expect(match(foo, foo)).to.be.true;
    });

    it('returns false for different functions', function () {
        expect(match(function foo() {}, function bar() {})).to.be.false;
    });
});