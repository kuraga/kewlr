import { strict, shallow, match } from '../../src/kewlr';

const expect = chai.expect;

describe('primitives', () => {

    it('should return true for string objects with identical primitive values', () => {
        expect(strict(String('Keith'), String('Keith'))).to.be.true;
        expect(shallow(String('Keith'), String('Keith'))).to.be.true;
    });

    it('should return true for string primitives and their corresponding object wrappers', () => {
        expect(strict(String('Keith'), 'Keith')).to.be.true;
        expect(shallow(String('Keith'), 'Keith')).to.be.true;
        expect(strict('Keith', String('Keith'))).to.be.true;
        expect(shallow('Keith', String('Keith'))).to.be.true;
    });

    it('should return false for string primitives with different values', () => {
        expect(strict(String('Keith'), String('asdf'))).to.be.false;
        expect(shallow(String('Keith'), String('asdf'))).to.be.false;
    });

    it('should return false for string objects and objects with a custom `toString` method', () => {
        expect(strict(String('Keith'), {toString: function(): any { return 'Keith'; }})).to.be.false;
        expect(shallow(String('Keith'), {toString: function(): any { return 'Keith'; }})).to.be.true;
    });

    it('should return true for string objects with identical primitive values', () => {
        expect(strict(String('Keith'), String('Keith'))).to.be.true;
        expect(shallow(String('Keith'), String('Keith'))).to.be.true;
    });

    it('should return true for number primitives and their corresponding object wrappers', () => {
        expect(strict(75, Number(75))).to.be.true;
        expect(shallow(75, Number(75))).to.be.true;
        expect(match(75, Number(75))).to.be.true;
    });

    it('should return true for boolean  objects with identical primitive values', () => {
        expect(strict(Boolean, Boolean)).to.be.true;
        expect(shallow(Boolean, Boolean)).to.be.true;
    });
    it('should return true for boolean primitives and their corresponding object wrappers', () => {
        expect(strict(true, Boolean(true))).to.be.true;
        expect(shallow(true, Boolean(true))).to.be.true;
    });

    it('should return false for boolean objects with different primitive values', () => {
        expect(strict(Boolean(true), Boolean)).to.be.false;
        expect(shallow(Boolean(true), Boolean)).to.be.false;
    });

    it('should return true for Object(`NaN`)', () => {
        expect(strict(Number(NaN), NaN)).to.be.true;
        expect(shallow(Number(NaN), NaN)).to.be.true;
    });

    it('should return true for boolean false and boolean false', () => {
        expect(strict(false, Object(false))).to.be.true;
        expect(shallow(false, Object(false))).to.be.true;
    });

    it('should return false for boolean false and boolean true', () => {
        expect(strict(Object(true), false)).to.be.false;
        expect(shallow(Object(true), false)).to.be.false;
        expect(match(Object(true), false)).to.be.false;
    });

    it('should return false for number objects vs NaN', () => {
        expect(strict(Number(79), NaN)).to.be.false;
        expect(shallow(Number(79), NaN)).to.be.false;
        expect(match(Number(79), NaN)).to.be.false;
    });

    it('should return false for Infinity vs NaN', () => {
        expect(strict(Infinity, NaN)).to.be.false;
        expect(shallow(Infinity, NaN)).to.be.false;
    });

    it('should return false for boolean and number objects with like values', () => {
        expect(strict(Boolean(false), Number(0))).to.be.false;
        expect(shallow(Boolean(false), Number(0))).to.be.true;
    });

    it('should return false for boolean and number objects with like values', () => {
        expect(strict(false, String(''))).to.be.false;
        expect(shallow(false, String(''))).to.be.true;
        expect(match(false, String(''))).to.be.false;
    });

    it('should return false for dates and their corresponding numeric primitive values', () => {
        expect(strict(12564504e5, new Date(2009, 9, 25))).to.be.false;
        expect(shallow(12564504e5, new Date(2009, 9, 25))).to.be.false;
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
        expect(match(true, 1)).to.be.false;
        expect(match(true, 'a')).to.be.false;

    });

    it('should compare primitives correctly - strict mode', () => {
        expect(strict(Object.keys(true), [])).to.be.true;
        expect(strict(Object.keys('a'), [])).to.be.false;
        expect(strict(Object.keys(1), [])).to.be.true;
    });

    it('should compare primitives correctly - shallow mode', () => {
        expect(shallow(Object.keys(true), [])).to.be.true;
        expect(shallow(Object.keys('a'), [])).to.be.false;
        expect(shallow(Object.keys(1), [])).to.be.true;
    });

    it('should compare primitives correctly - shallow mode', () => {
        expect(shallow(1, 1)).to.be.true;
        expect(shallow(1, Object(1))).to.be.true;
        expect(shallow(1, '1')).to.be.true;
        expect(shallow(-0, -0)).to.be.true;
        expect(shallow(0, 0)).to.be.true;
        expect(shallow(0, Object(0))).to.be.true;
        expect(shallow(0, Object(0))).to.be.true;
        expect(shallow(Object(0), Object(0))).to.be.true;
        expect(shallow(NaN, Object(NaN))).to.be.true;
        expect(shallow(Object(NaN), Object(NaN))).to.be.true;
        expect(shallow(-0, 0)).to.be.true;
        expect(shallow(0, '0')).to.be.true;
        expect(match(0, '0')).to.be.false;
        expect(shallow(0, null)).to.be.false;
        expect(shallow(NaN, NaN)).to.be.true;
        expect(shallow(NaN, Object(NaN))).to.be.true;
        expect(shallow(NaN, Infinity)).to.be.false;
        expect(shallow('a', 'a')).to.be.true;
        expect(shallow('a', ['a'])).to.be.true;
        expect(shallow(null, null)).to.be.true;
        expect(shallow(null, {})).to.be.false;
        expect(shallow(true, 1)).to.be.true;
        expect(shallow(true, 'a')).to.be.false;
    });
});