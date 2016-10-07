import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('undefined', () => {

    it('should return true for both undefined', () => {
        expect(strict(undefined, undefined)).to.be.true;
        expect(loose(undefined, undefined)).to.be.true;
    });

    it('should return false for undefined + null', () => {
        expect(strict(undefined, null)).to.be.false;
        expect(loose(undefined, null)).to.be.true;
    });

    it('should return false for null + undefined', () => {
        expect(strict(null, undefined)).to.be.false;
        expect(loose(null, undefined)).to.be.true;
    });

    it('should return false for non undefined values', () => {
        expect(strict(undefined, null)).to.be.false;
        expect(strict(undefined, '')).to.be.false;
        expect(strict(undefined, 0)).to.be.false;
        expect(strict(undefined, [])).to.be.false;
        expect(loose(undefined, 0)).to.be.false;
        expect(loose(undefined, [])).to.be.false;
        expect(strict(undefined, NaN)).to.be.false;
    })
});