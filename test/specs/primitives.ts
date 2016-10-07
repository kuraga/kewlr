import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('primitives', () => {

    it('should compare primitives correctly - strict mode', () => {
        expect(strict(1, 1)).to.be.true;
        expect(strict(1, Object(1))).to.be.false;
        expect(strict(1, '1')).to.be.false;
        expect(strict(-0, -0)).to.be.true;
        expect(strict(0, 0)).to.be.true;
        expect(strict(0, Object(0))).to.be.false;
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