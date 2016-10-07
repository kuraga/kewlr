import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('null', () => {

    it('should return true for equal nulls', () => {
        expect(strict(null, null)).to.be.true;
        expect(loose(null, null)).to.be.true;
    });

    it('commutative equality is implemented for `null` and `undefined`', () => {
        expect(strict(void 0, null)).to.be.false;
        expect(loose(void 0, null)).to.be.true;
    });

    it('should return true for nested nulls', () => {
        expect(strict([null, null, null], [null, null, null])).to.be.true;
        expect(strict([ null, null, null ], [ null, 'null', null ])).to.be.false;
        expect(loose([null, null, null], [null, null, null])).to.be.true;
        expect(loose([ null, null, null ], [ null, 'null', null ])).to.be.false;
    });

    it('should return false for null, undefined', () => {
        expect(strict(null, undefined)).to.be.false;
        expect(loose(null, undefined)).to.be.true;
    });

    it('should equal only itself', () => {
        expect(strict(null, undefined)).to.be.false;
        expect(strict(null, '')).to.be.false;
        expect(strict(null, 0)).to.be.false;
        expect(strict(null, [])).to.be.false;
        expect(loose(null, 0)).to.be.false;
        expect(loose(null, [])).to.be.false;
        expect(strict(null, null)).to.be.true;
        expect(strict(null, NaN)).to.be.false;
        expect(loose(null, NaN)).to.be.false;
    });
});