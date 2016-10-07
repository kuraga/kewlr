import { strict, shallow } from '../../src/kewlr';
const expect = chai.expect;
describe('Errors', () => {

    it('should return false for different errors- shallow mode', () => {
        expect(shallow(new EvalError(), new EvalError())).to.be.true;
        expect(shallow(new RangeError(), new RangeError())).to.be.true;
        expect(shallow(new ReferenceError(), new ReferenceError())).to.be.true;
        expect(shallow(new ReferenceError(), new ReferenceError())).to.be.true;
        expect(shallow(new SyntaxError(), new SyntaxError())).to.be.true;
        expect(shallow(new URIError(), new URIError())).to.be.true;
        expect(shallow(new TypeError(), new TypeError())).to.be.true;
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
        expect(shallow(new ReferenceError(), /x/)).to.be.true;
        expect(strict(new ReferenceError(), /x/)).to.be.false; // 'true' only in strict mode
    });
});