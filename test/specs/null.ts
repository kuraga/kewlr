import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

describe('null', () => {

    it('should return true for equal nulls', () => {
        expect(strict(null, null)).to.be.true;
        expect(shallow(null, null)).to.be.true;
    });

    it('commutative equality is implemented for `null` and `undefined`', () => {
        expect(strict(void 0, null)).to.be.false;
        expect(shallow(void 0, null)).to.be.true;
    });

    it('should return true for nested nulls', () => {
        expect(strict([null, null, null], [null, null, null])).to.be.true;
        expect(strict([ null, null, null ], [ null, 'null', null ])).to.be.false;
        expect(shallow([null, null, null], [null, null, null])).to.be.true;
        expect(shallow([ null, null, null ], [ null, 'null', null ])).to.be.false;
    });

    it('should return false for null, undefined', () => {
        expect(strict(null, undefined)).to.be.false;
        expect(shallow(null, undefined)).to.be.true;
    });

    it('should equal only itself', () => {
        expect(strict(null, undefined)).to.be.false;
        expect(strict(null, '')).to.be.false;
        expect(strict(null, 0)).to.be.false;
        expect(strict(null, [])).to.be.false;
        expect(shallow(null, 0)).to.be.false;
        expect(shallow(null, [])).to.be.false;
        expect(strict(null, null)).to.be.true;
        expect(strict(null, NaN)).to.be.false;
        expect(shallow(null, NaN)).to.be.false;
    });
});