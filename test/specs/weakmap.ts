import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

if (typeof WeakMap === 'function') {

    describe('weakmaps', () => {

        it('returns true for same WeakMaps', () => {
            const weakMap = new WeakMap();
            expect(strict(weakMap, weakMap)).to.be.true;
            expect(shallow(weakMap, weakMap)).to.be.true;
        });

        it('returns false for different WeakMaps', () => {
            expect(strict(new WeakMap(), new WeakMap())).to.be.false;
            expect(shallow(new WeakMap(), new WeakMap())).to.be.false;
            expect(strict(new WeakMap(), 123)).to.be.false;
            expect(strict(new WeakMap(), {})).to.be.false;
            expect(strict(new WeakMap(), {a: 1, b: 2})).to.be.false;
            expect(strict(123, new WeakMap())).to.be.false;
            expect(strict({}, new WeakMap())).to.be.false;
            expect(strict({a: 1, b: 2}, new WeakMap())).to.be.false;
            expect(shallow(new WeakMap(), 123)).to.be.false;
            expect(shallow(new WeakMap(), {})).to.be.false;
            expect(shallow(new WeakMap(), {a:1, b: 2})).to.be.false;
            expect(shallow(123, new WeakMap())).to.be.false;
            expect(shallow({}, new WeakMap())).to.be.true;
            expect(shallow({a: 1, b: 2}, new WeakMap())).to.be.false;
        });
    });
}