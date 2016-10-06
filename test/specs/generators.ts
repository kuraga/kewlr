import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('Generators',  () => {

    it('should return true for both strict and loose mode', () => {
        function* idMaker(){
            let index = 0;
            while(true) {
              yield index++;
            }
        }

        let gen = idMaker(); // "Generator { }"

        expect(strict(gen.next().value, 0)).to.be.true;
        expect(strict(gen.next().value, 1)).to.be.true;
        expect(strict(gen.next().value, 2)).to.be.true;
        expect(loose(gen.next().value, 3)).to.be.true;
        expect(loose(gen.next().value, 4)).to.be.true;
        expect(loose(gen.next().value, 5)).to.be.true;
    });

    it('should return true for same arrow functions', () => {
        let generator = eval('function * generator() {}; generator');
        expect(strict(generator, generator)).to.be.true;
    });
    it('should return true for same arrow functions', () => {
        let generator = eval('function * generator() {}; generator');
        expect(strict(generator, generator)).to.be.true;
    });

    it('should return false for different arrow functions', () => {
        expect(strict(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
    });

    it('should return false for different arrow functions', () => {
        expect(strict(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
        expect(loose(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
    });

    it('should return true for same generator function calls', () => {
        let generator = eval('function * generator() { yield 1; yield 2; }; generator');
        expect(strict(generator(), generator())).to.be.true;
    });

    it('should return false for different generator function calls that return same results', () => {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
        expect(strict(generatorA(), generatorB())).to.be.false;
    });

    it('should return true for different generator function calls are at level of iteration with same results', () => {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; yield 3; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 6; yield 2; yield 3; }; generatorB');
        let generatorAIterator = generatorA();
        let generatorBIterator = generatorB();
        generatorAIterator.next();
        generatorBIterator.next();
        expect(strict(generatorAIterator, generatorBIterator)).to.be.false;
    });

    it('should return false for same generator function calls that return different results', () => {
        let generator = eval('let set = 0; function * generator() { yield set++; }; generator');
        expect(strict(generator(), generator())).to.be.false;
    });

    it('should return false for generators at different stages of iteration', () => {
        let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
        let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
        let generatorBIterator = generatorB();
        generatorBIterator.next();
        expect(strict(generatorA(), generatorBIterator)).to.be.false;
        expect(loose(generatorA(), generatorBIterator)).to.be.true;
    });

    it('should return false for generators if one is done', () => {
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