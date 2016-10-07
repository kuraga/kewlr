import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;
var supportGenerators = false;
var supportArrows = false;

try {
    eval('function * foo () {}; foo');
    supportGenerators = true;
} catch (error) {
    supportGenerators = false;
}
try {
    eval('() => {}');
    supportArrows = true;
} catch (error) {
    supportArrows = false;
}

describe('Generators',  () => {
    if (supportGenerators && supportArrows) {
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
            expect(shallow(eval('function * generator() {}; generator'), eval('function * generator() {}; generator'))).to.be.false;
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

        it('should return false for generators at different stages of iteration', () => {
            let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
            let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
            let generatorBIterator = generatorB();
            generatorBIterator.next();
            expect(strict(generatorA(), generatorBIterator)).to.be.false;
            expect(shallow(generatorA(), generatorBIterator)).to.be.true;
        });

        it('should return false for generators if one is done', () => {
            let generatorA = eval('function * generatorA() { yield 1; yield 2; }; generatorA');
            let generatorB = eval('function * generatorB() { yield 1; yield 2; }; generatorB');
            let generatorBIterator = generatorB();
            generatorBIterator.next();
            generatorBIterator.next();
            generatorBIterator.next();
            expect(strict(generatorA(), generatorBIterator)).to.be.false;
            expect(shallow(generatorA(), generatorBIterator)).to.be.true;
        });
    }
});
