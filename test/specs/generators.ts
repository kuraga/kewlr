import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('Generators',  () => {
    it('returns true for same arrow functions', function () {
        let generator = eval('function * generator() {}; generator');
        expect(strict(generator, generator)).to.be.true;
    });

    it('returns false for different arrow functions', () => {
        expect(strict(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
    });

    it('returns false for different arrow functions', function () {
        expect(strict(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
        expect(loose(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
    });

    it('returns true for same generator function calls', function () {
        let generator = eval('function * generator() { yield 1; yield 2; }; generator');
        expect(strict(generator(), generator())).to.be.true;
    });

    it('returns false for different generator function calls that return same results', function () {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
        expect(strict(generatorA(), generatorB())).to.be.false;
    });

    it('returns true for different generator function calls are at level of iteration with same results', function () {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; yield 3; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 6; yield 2; yield 3; }; generatorB');
        let generatorAIterator = generatorA();
        let generatorBIterator = generatorB();
        generatorAIterator.next();
        generatorBIterator.next();
         expect(strict(generatorAIterator, generatorBIterator)).to.be.false;
    });

    it('returns false for same generator function calls that return different results', function () {
        let generator = eval('let set = 0; function * generator() { yield set++; }; generator');
        expect(strict(generator(), generator())).to.be.false;
    });

    it('returns false for generators at different stages of iteration', function () {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
        let generatorBIterator = generatorB();
        generatorBIterator.next();
        expect(strict(generatorA(), generatorBIterator)).to.be.false;
        expect(loose(generatorA(), generatorBIterator)).to.be.true;
    });

    it('returns false for generators if one is done', function () {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
        let generatorBIterator = generatorB();
        generatorBIterator.next();
        generatorBIterator.next();
        generatorBIterator.next();
        expect(strict(generatorA(), generatorBIterator)).to.be.false;
        expect(loose(generatorA(), generatorBIterator)).to.be.true;
    });
});