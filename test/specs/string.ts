import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('strings', () => {
    it('should return true for same values', () => {
        expect(strict('x', 'x')).to.be.true;
    });
    it('should return false for different strings', () => {
        expect(strict('x', 'y')).to.be.false;
        expect(loose('x', 'y')).to.be.false;
    });
    it('should return false for number + string', () => {
        expect(strict(3, '3')).to.be.false;
        expect(strict('3', 3)).to.be.false;
    });
    it('should return false for object + string', () => {
        expect(strict({foo: 1}, 'bar')).to.be.false;
        expect(strict('bar', {foo: 1})).to.be.false;
    });
    it('should return false for number + [string]', () => {
        expect(strict(3, ['3'])).to.be.false;
        expect(loose(3, ['3'])).to.be.true;
    });
    it('should return false for different number + string', () => {
        expect(strict('3', 5)).to.be.false;
        expect(strict(5, '3')).to.be.false;
        expect(loose('3', 5)).to.be.false;
        expect(loose(5, '3')).to.be.false;
    });
});