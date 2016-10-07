import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

describe('undefined', () => {

    it('should return true for both undefined', () => {
        expect(strict(undefined, undefined)).to.be.true;
        expect(shallow(undefined, undefined)).to.be.true;
    });

    it('should return false for undefined + null', () => {
        expect(strict(undefined, null)).to.be.false;
        expect(shallow(undefined, null)).to.be.true;
    });

    it('should return false for null + undefined', () => {
        expect(strict(null, undefined)).to.be.false;
        expect(shallow(null, undefined)).to.be.true;
    });

    it('should return false for non undefined values', () => {
        expect(strict(undefined, null)).to.be.false;
        expect(strict(undefined, '')).to.be.false;
        expect(strict(undefined, 0)).to.be.false;
        expect(strict(undefined, [])).to.be.false;
        expect(shallow(undefined, 0)).to.be.false;
        expect(shallow(undefined, [])).to.be.false;
        expect(strict(undefined, NaN)).to.be.false;
    })
});