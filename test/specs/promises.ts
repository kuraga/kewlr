import { strict, shallow, chai as match } from '../../src/kewlr';

const expect = chai.expect;

describe('Promises',  () => {

    const emptyFunction = Function.prototype;

    it('should compare promises by reference', () => {
        let promise1 = Promise;
        let promise2 = Promise.resolve(1);
        expect(strict(promise1, promise2)).to.be.false;
        expect(strict(promise1, promise1)).to.be.true;
        expect(match(promise1, promise1)).to.be.true;
        expect(shallow(promise1, promise1)).to.be.true;
    });

    it('returns true for the same promises', () => {
        let promiseResolve = Promise.resolve();
        let promisePending = new (Promise as any)(emptyFunction);
        expect(strict(promiseResolve, promiseResolve)).to.be.true;
        expect(strict(promisePending, promisePending)).to.be.true;
        expect(shallow(promiseResolve, promiseResolve)).to.be.true;
        expect(shallow(promisePending, promisePending)).to.be.true;
    });

    it('returns false for different promises', () => {
        expect(strict(Promise.resolve(), 123)).to.be.false;
        expect(shallow(Promise.resolve(), 123)).to.be.false;
        expect(strict(123, Promise.resolve())).to.be.false;
        expect(strict(Promise.resolve(), Promise.resolve())).to.be.false;
        expect(shallow(Promise.resolve(), Promise.resolve())).to.be.false;
        expect(strict(new (Promise as any)(emptyFunction), new (Promise as any)(emptyFunction))).to.be.false;
        expect(shallow(new (Promise as any)(emptyFunction), new (Promise as any)(emptyFunction))).to.be.false;
    });
});