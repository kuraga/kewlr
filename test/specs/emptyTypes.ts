import { strict, shallow, match } from '../../src/kewlr';

const expect = chai.expect;

describe('empty types', () => {

    it('should return true on two empty object literals', () => {
        expect(strict({}, {})).to.be.true;
        expect(shallow({}, {})).to.be.true;
    });

    it('should return true on two empty array literals', () => {
        expect(strict([], [])).to.be.true;
        expect(shallow([], [])).to.be.true;
        expect(match([], [])).to.be.true;
    });

    it('should return true for empty nested arrays and objects', () => {
        expect(strict([{}], [{}])).to.be.true;
        expect(shallow([{}], [{}])).to.be.true;
    });

    it('should return false for object literals and array literals - strict mode', () => {
        expect(strict({}, [])).to.be.false;
    });

    it('should return false for object literals and array literals - match mode', () => {
        expect(match({}, [])).to.be.false;
    });

    it('should return true for object literals and array literals - shallow mode', () => {
        expect(shallow({}, [])).to.be.true;
    });
});