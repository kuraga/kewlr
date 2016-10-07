import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('arguments',  () => {

    function toArgs(): any {
        return arguments;
    }

    it('returns true given two arguments',  () => {
        let argumentsA = toArgs();
        let argumentsB = toArgs();
        expect(strict(argumentsA, argumentsB)).to.be.true;
        expect(loose(argumentsA, argumentsB)).to.be.true;
    });

    it('returns true given two arguments with same properties',  () => {
        let argumentsA = (toArgs as any)(1, 2);
        let argumentsB = (toArgs as any)(1, 2);
        expect(strict(argumentsA, argumentsB)).to.be.true;
        expect(loose(argumentsA, argumentsB)).to.be.true;
    });

    it('should return false for similar arguments + array',  () => {
        expect(strict([1, 2, 3], (toArgs as any)(1, 2, 3))).to.be.false;
        expect(loose([1, 2, 3], (toArgs as any)(1, 2, 3))).to.be.false;
    });

    it('should return false for similar array + arguments',  () => {
        expect(strict((toArgs as any)(1, 2, 3), [1, 2, 3])).to.be.false;
        expect(loose((toArgs as any)(1, 2, 3), [1, 2, 3])).to.be.false;
    });

    it('should return false for similar arguments + array-like',  () => {
        expect(strict((toArgs as any)(1, 2, 3), {length: 3, 0: 1, 1: 2, 2: 3})).to.be.false;
        expect(loose((toArgs as any)(1, 2, 3), {length: 3, 0: 1, 1: 2, 2: 3})).to.be.false;
    });

    it('should return false for similar array-like + arguments',  () => {
        expect(strict({length: 3, 0: 1, 1: 2, 2: 3}, (toArgs as any)(1, 2, 3))).to.be.false;
        expect(loose({length: 3, 0: 1, 1: 2, 2: 3}, (toArgs as any)(1, 2, 3))).to.be.false;
    });

    it('returns false given two arguments with different properties',  () => {
        let argumentsA = (toArgs as any)(1, 2);
        let argumentsB = (toArgs as any)(3, 4);
        expect(strict(argumentsA, argumentsB)).to.be.false;
        expect(loose(argumentsA, argumentsB)).to.be.false;
    });

    it('returns false given an array', () => {
        expect(strict([], arguments)).to.be.false;
        expect(loose([], arguments)).to.be.false;
    });

    it('returns false given an object',  () => {
        expect(strict({}, arguments)).to.be.false;
        expect(loose({}, arguments)).to.be.false;
    });
});