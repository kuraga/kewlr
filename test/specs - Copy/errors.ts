import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('Errors', () => {

    it('should return false for different errors- loose mode', () => {
        expect(loose(new EvalError(), new EvalError())).to.be.true;
        expect(loose(new RangeError(), new RangeError())).to.be.true;
        expect(loose(new ReferenceError(), new ReferenceError())).to.be.true;
        expect(loose(new ReferenceError(), new ReferenceError())).to.be.true;
        expect(loose(new SyntaxError(), new SyntaxError())).to.be.true;
        expect(loose(new URIError(), new URIError())).to.be.true;
        expect(loose(new TypeError(), new TypeError())).to.be.true;
    });

    it('should return false for different errors- strict mode', () => {
        expect(strict(new EvalError(), new EvalError())).to.be.false;
        expect(strict(new RangeError(), new RangeError())).to.be.false;
        expect(strict(new ReferenceError(), new ReferenceError())).to.be.false;
        expect(strict(new ReferenceError(), new ReferenceError())).to.be.false;
        expect(strict(new SyntaxError(), new SyntaxError())).to.be.false;
        expect(strict(new URIError(), new URIError())).to.be.false;
        expect(strict(new TypeError(), new TypeError())).to.be.false;
    });

    it('should return false for non errors', () => {
        expect(strict(new TypeError(), 1)).to.be.false;
        expect(strict(new RangeError(), [1, 2, 3])).to.be.false;
        expect(strict(new TypeError(), { 'a': 1 })).to.be.false;
        expect(strict(new TypeError(), { 'a': 1 })).to.be.false;
        expect(strict(new URIError(), 'a')).to.be.false;
        expect(loose(new ReferenceError(), /x/)).to.be.true;
        expect(strict(new ReferenceError(), /x/)).to.be.false; // 'true' only in strict mode
    });
});