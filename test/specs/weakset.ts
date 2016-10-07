import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

if (typeof WeakSet === 'function') {

    describe('WeakSets', function () {

        it('returns true for same WeakSets', function () {
            const weakSet = new WeakSet();
            expect(strict(weakSet, weakSet)).to.be.true;
            expect(loose(weakSet, weakSet)).to.be.true;
        });

        it('returns false for different WeakSets', function () {
            expect(strict(new WeakSet(), new WeakSet())).to.be.false;
            expect(strict(new WeakSet(), new WeakSet())).to.be.false;
            expect(strict(new WeakSet(), 123)).to.be.false;
            expect(strict(new WeakSet(), {})).to.be.false;
            expect(loose(new WeakSet(), {})).to.be.false;
            expect(strict(new WeakSet(), {a:1, b: 2})).to.be.false;
            expect(strict(123, new WeakSet())).to.be.false;
            expect(strict({}, new WeakSet())).to.be.false;
            expect(loose({}, new WeakSet())).to.be.true;
            expect(strict({a: 1, b: 2}, new WeakSet())).to.be.false;
        });
    });
}