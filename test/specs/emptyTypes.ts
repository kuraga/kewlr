import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('empty types', () => {
    it('should return true on two empty objects', () => {
        expect(strict({}, {})).to.be.true;
    });
    it('should return true on two empty arrays', () => {
        expect(strict([], [])).to.be.true;
        expect(loose([], [])).to.be.true;
    });
    it('should return false on different types', () => {
        expect(strict([], {})).to.be.false;
        expect(strict({}, [])).to.be.false;
        expect(loose([], {})).to.be.true;
        expect(loose({}, [])).to.be.true;
    });
});