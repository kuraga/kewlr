import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('primitives', () => {

    it('should return true for string objects with identical primitive values', () => {
        expect(strict(String('Keith'), String('Keith'))).to.be.true;
        expect(loose(String('Keith'), String('Keith'))).to.be.true;
    });

    it('should return true for string primitives and their corresponding object wrappers', () => {
        expect(strict(String('Keith'), 'Keith')).to.be.true;
        expect(loose(String('Keith'), 'Keith')).to.be.true;
        expect(strict('Keith', String('Keith'))).to.be.true;
        expect(loose('Keith', String('Keith'))).to.be.true;
    });

    it('should return false for string primitives with different values', () => {
        expect(strict(String('Keith'), String('asdf'))).to.be.false;
        expect(loose(String('Keith'), String('asdf'))).to.be.false;
    });

    it('should return false for string objects and objects with a custom `toString` method', () => {
        expect(strict(String('Keith'), {toString: function(): any { return 'Keith'; }})).to.be.false;
        expect(loose(String('Keith'), {toString: function(): any { return 'Keith'; }})).to.be.true;
    });

    it('should return true for string objects with identical primitive values', () => {
        expect(strict(String('Keith'), String('Keith'))).to.be.true;
        expect(loose(String('Keith'), String('Keith'))).to.be.true;
    });

    it('should return true for number primitives and their corresponding object wrappers', () => {
        expect(strict(75, Number(75))).to.be.true;
        expect(loose(75, Number(75))).to.be.true;
    });

    it('should return true for boolean  objects with identical primitive values', () => {
        expect(strict(Boolean, Boolean)).to.be.true;
        expect(loose(Boolean, Boolean)).to.be.true;
    });
    it('should return true for boolean primitives and their corresponding object wrappers', () => {
        expect(strict(true, Boolean(true))).to.be.true;
        expect(loose(true, Boolean(true))).to.be.true;
    });

    it('should return false for boolean objects with different primitive values', () => {
        expect(strict(Boolean(true), Boolean)).to.be.false;
        expect(loose(Boolean(true), Boolean)).to.be.false;
    });

    it('should return true for Object(`NaN`)', () => {
        expect(strict(Number(NaN), NaN)).to.be.true;
        expect(loose(Number(NaN), NaN)).to.be.true;
    });

    it('should return false for number objects vs NaN', () => {
        expect(strict(Number(79), NaN)).to.be.false;
        expect(loose(Number(79), NaN)).to.be.false;
    });

    it('should return false for Infinity vs NaN', () => {
        expect(strict(Infinity, NaN)).to.be.false;
        expect(loose(Infinity, NaN)).to.be.false;
    });

    it('should return false for boolean and number objects with like values', () => {
        expect(strict(Boolean(false), Number(0))).to.be.false;
        expect(loose(Boolean(false), Number(0))).to.be.true;
    });

    it('should return false for boolean and number objects with like values', () => {
        expect(strict(false, String(''))).to.be.false;
        expect(loose(false, String(''))).to.be.true;
    });

    it('should return false for dates and their corresponding numeric primitive values', () => {
        expect(strict(12564504e5, new Date(2009, 9, 25))).to.be.false;
        expect(loose(12564504e5, new Date(2009, 9, 25))).to.be.false;
    });

    it('should compare primitives correctly - strict mode', () => {
        expect(strict(1, 1)).to.be.true;
        expect(strict(1, Object(1))).to.be.true;
        expect(strict(1, '1')).to.be.false;
        expect(strict(-0, -0)).to.be.true;
        expect(strict(0, 0)).to.be.true;
        expect(strict(0, Object(0))).to.be.true;
        expect(strict(-0, 0)).to.be.true;
        expect(strict(0, '0')).to.be.false;
        expect(strict(0, null)).to.be.false;
        expect(strict(NaN, NaN)).to.be.true;
        expect(strict(NaN, Object(NaN))).to.be.false;
        expect(strict(0, Object(0))).to.be.true;
        expect(strict(Object(0), Object(0))).to.be.true;
        expect(strict(NaN, Object(NaN))).to.be.false;
        expect(strict(Object(NaN), Object(NaN))).to.be.true;
        expect(strict(NaN, 'a')).to.be.false;
        expect(strict(NaN, Infinity)).to.be.false;
        expect(strict('a', 'a')).to.be.true;
        expect(strict('a', ['a'])).to.be.false;
        expect(strict(null, null)).to.be.true;
        expect(strict(null, {})).to.be.false;
        expect(strict(true, 1)).to.be.false;
        expect(strict(true, 'a')).to.be.false;
    });

    it('should compare primitives correctly - strict mode', () => {
        expect(strict(Object.keys(true), [])).to.be.true;
        expect(strict(Object.keys('a'), [])).to.be.false;
        expect(strict(Object.keys(1), [])).to.be.true;
    });

    it('should compare primitives correctly - loose mode', () => {
        expect(loose(Object.keys(true), [])).to.be.true;
        expect(loose(Object.keys('a'), [])).to.be.false;
        expect(loose(Object.keys(1), [])).to.be.true;
    });

    it('should compare primitives correctly - loose mode', () => {
        expect(loose(1, 1)).to.be.true;
        expect(loose(1, Object(1))).to.be.true;
        expect(loose(1, '1')).to.be.true;
        expect(loose(-0, -0)).to.be.true;
        expect(loose(0, 0)).to.be.true;
        expect(loose(0, Object(0))).to.be.true;
        expect(loose(0, Object(0))).to.be.true;
        expect(loose(Object(0), Object(0))).to.be.true;
        expect(loose(NaN, Object(NaN))).to.be.false;
        expect(loose(Object(NaN), Object(NaN))).to.be.true;
        expect(loose(-0, 0)).to.be.true;
        expect(loose(0, '0')).to.be.true;
        expect(loose(0, null)).to.be.false;
        expect(loose(NaN, NaN)).to.be.true;
        expect(loose(NaN, Object(NaN))).to.be.false;
        expect(loose(NaN, Infinity)).to.be.false;
        expect(loose('a', 'a')).to.be.true;
        expect(loose('a', ['a'])).to.be.true;
        expect(loose(null, null)).to.be.true;
        expect(loose(null, {})).to.be.false;
        expect(loose(true, 1)).to.be.true;
        expect(loose(true, 'a')).to.be.false;
    });
});