import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

describe('Symbols()', () => {
    it('should return true for the same symbols', () => {
        let sym = Symbol();
        expect(strict(sym, sym)).to.be.true;
        expect(strict(Symbol.iterator, Symbol.iterator)).to.be.true;
        expect(shallow(Symbol.iterator, Symbol.iterator)).to.be.true;
    });

    it('should return false for similar symbols', () => {
        expect(strict(Symbol('foo'), Symbol('foo'))).to.be.false;
        expect(shallow(Symbol('foo'), Symbol('foo'))).to.be.false;
    });

    it('should return false for different Symbols()', () => {
        expect(strict(Symbol('foo'), Symbol('bar'))).to.be.false;
        expect(strict(Symbol(), Symbol())).to.be.false;
        expect(shallow(Symbol('foo'), Symbol('bar'))).to.be.false;
        expect(shallow(Symbol(), Symbol())).to.be.false;
        expect(strict([], Symbol())).to.be.false;
        expect(strict(Symbol(), '')).to.be.false;
        expect(strict(Symbol(), {})).to.be.false;
        expect(shallow([], Symbol())).to.be.true;
        expect(shallow(Symbol(), '')).to.be.false;
        expect(shallow(Symbol(), {})).to.be.true;
    });
});