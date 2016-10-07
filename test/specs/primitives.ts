import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('primitives', () => {

    it('should return true for string objects with identical primitive values', () => {
        expect(strict(new String('Curly'), new String('Curly'))).to.be.true;
        expect(loose(new String('Curly'), new String('Curly'))).to.be.true;
    });

    it('should return true for string primitives and their corresponding object wrappers', () => {
        expect(strict(new String('Curly'), 'Curly')).to.be.true;
        expect(loose(new String('Curly'), 'Curly')).to.be.true;
        expect(strict('Curly', new String('Curly'))).to.be.true;
        expect(loose('Curly', new String('Curly'))).to.be.true;
    });

    it('should return false for string primitives with different values', () => {
        expect(strict(new String('Curly'), new String('asdf'))).to.be.false;
        expect(loose(new String('Curly'), new String('asdf'))).to.be.false;
    });

    it('should return false for string objects and objects with a custom `toString` method', () => {
        expect(strict(new String('Curly'), {toString: function(){ return 'Curly'; }})).to.be.false;
        expect(loose(new String('Curly'), {toString: function(){ return 'Curly'; }})).to.be.true;
    });

     it('should return true for string objects with identical primitive values', () => {
        expect(strict(new String('Curly'), new String('Curly'))).to.be.true;
        expect(loose(new String('Curly'), new String('Curly'))).to.be.true;
    });

     it('should return true for number primitives and their corresponding object wrappers', () => {
        expect(strict(75, new Number(75))).to.be.true;
        expect(loose(75, new Number(75))).to.be.true;
    });

    it('should return true for boolean  objects with identical primitive values', () => {
        expect(strict(new Boolean, new Boolean)).to.be.true;
        expect(loose(new Boolean, new Boolean)).to.be.true;
    });
    it('should return true for boolean primitives and their corresponding object wrappers', () => {
        expect(strict(true, new Boolean(true))).to.be.true;
        expect(loose(true, new Boolean(true))).to.be.true;
    });

    it('should return false for boolean objects with different primitive values', () => {
        expect(strict(new Boolean(true), new Boolean)).to.be.false;
        expect(loose(new Boolean(true), new Boolean)).to.be.false;
    });

     it('should return true for Object(`NaN`)', () => {
        expect(strict(new Number(NaN), NaN)).to.be.true;
        expect(loose(new Number(NaN), NaN)).to.be.true;
    });

     it('should return false for number objects vs NaN', () => {
        expect(strict(new Number(79), NaN)).to.be.false;
        expect(loose(new Number(79), NaN)).to.be.false;
    });

    it('should return false for Infinity vs NaN', () => {
        expect(strict(Infinity, NaN)).to.be.false;
        expect(loose(Infinity, NaN)).to.be.false;
    });

    it('should return false for boolean and number objects with like values', () => {
        expect(strict(new Boolean(false), new Number(0))).to.be.false;
        expect(loose(new Boolean(false), new Number(0))).to.be.true;
    });

    it('should return false for boolean and number objects with like values', () => {
        expect(strict(false, new String(''))).to.be.false;
        expect(loose(false, new String(''))).to.be.true;
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