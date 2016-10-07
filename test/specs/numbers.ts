import { strict, loose, match } from '../../src/kewlr';
const expect = chai.expect;
describe('numbers', () => {
    it('should return false for commutative equality', () => {
        expect(strict(-0, 0)).to.be.true;
    });

    it('should return true for same values', () => {
        expect(strict(3, 3)).to.be.true;
        expect(strict(-0, -0)).to.be.true;
        expect(strict(+0, +0)).to.be.true;
        expect(strict(-0, -0)).to.be.true;
        expect(match(+0, +0)).to.be.true;
        expect(match(0, 0)).to.be.true;
        expect(match(-0, +0)).to.be.false;
        expect(match(-0, 0)).to.be.false;
        expect(strict(1, 1)).to.be.true;
        expect(strict(Infinity, Infinity));
        expect(strict(-Infinity, -Infinity));
    });
    it('should return false for literal vs instance with same value', () => {
        expect(strict(1, Number(1))).to.be.true;
        expect(strict(Number(1), 1)).to.be.true;
        expect(loose(1, Number(1))).to.be.true;
        expect(loose(Number(1), 1)).to.be.true;
    });
    it('should return true NaN vs NaN', () => {
        expect(strict(NaN, NaN)).to.be.true;
    });
    it('should return false for different numbers', () => {
        expect(strict(1, 3)).to.be.false;
        expect(strict(3, 1)).to.be.false;
        expect(match(3, 1)).to.be.false;
    });
    it('should handle different numbers do not match', () => {
        expect(strict(0, 1)).to.be.false;
        expect(strict(1, -1)).to.be.false;
        expect(strict(-1, 1)).to.be.false;
        expect(strict(3.14, 2.72)).to.be.false;
    });
    it('should return false on numbers with different signs', () => {
        expect(strict(-1, 1)).to.be.false;
        expect(strict(-Infinity, Infinity)).to.be.false;
        expect(strict(Infinity, -Infinity)).to.be.false;
        expect(loose(-1, 1)).to.be.false;
        expect(loose(-Infinity, Infinity)).to.be.false;
        expect(loose(Infinity, -Infinity)).to.be.false;
    });
    it('should handle numbers correctly', () => {
        expect(strict(-346, -346)).to.be.true;
        expect(strict(0, 0)).to.be.true;
        expect(strict(2376, 2376)).to.be.true;
        expect(strict(-672.234, -672.234)).to.be.true;
        expect(strict(9.358546212888048e-14, 9.358546212888048e-14)).to.be.true;
        expect(strict(5, -5)).to.be.false;
        expect(strict(8234, 7823)).to.be.false;
        expect(loose(8234, 7823)).to.be.false;
        expect(strict(-564.23466, 0.236852109)).to.be.false;
        expect(strict(9.358546212888048e-14, 9.358546212888047e-14)).to.be.false;
        expect(loose(9.358546212888048e-14, 9.358546212888047e-14)).to.be.false;
    });
});
