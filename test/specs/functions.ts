import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('functions', () => {
    let f1 = () => {};
    let f2 = () => {};
    it('should fail if they have different names', () => {
        expect(strict(function a() {}, function b() {})).to.be.false;
    });
    it('should pass if they are both anonamous', () => {
        expect(strict(() => {}, () => {})).to.be.false;
        expect(loose(() => {}, () => {})).to.be.false;
    });
    it('handle the case where they have different argument names', () => {
        expect(strict(function (b: any) {return b}, function (a: any) {return a})).to.be.false;
    })
    it('should compare them as objects', () => {
        let a: any = () => {};
        let b: any = () => {};
        a.title = 'sometitle';
        expect(strict(a, b)).to.be.false;
        expect(strict(b, a)).to.be.false;
        expect(strict(a, a)).to.be.true;
    });
    it('should be able to compare object methods', () => {
        expect(strict(
            {noop: () => {}},
            {noop: () => {}}
        )).to.be.false;
        expect(strict(
            {noop: function (a: any) {}},
            {noop: () => {}}
        )).to.be.false;
         expect(loose(
            {noop: () => {}},
            {noop: () => {}}
        )).to.be.false;
        expect(loose(
            {noop: function (a: any) {}},
            {noop: () => {}}
        )).to.be.false;
    });
    it('should return true for equal functions', () => {
        expect(strict(f1, f2)).to.be.false;
        expect(strict(f1, f1)).to.be.true;
        expect(strict(function a (foo: any) {}, function c (foo: any) {})).to.be.false;
    });
    it('should return true for nested functions', () => {
        expect(strict({'test': f1}, {'test': f2})).to.be.false;
        expect(strict({'test': f1}, {'test': f1})).to.be.true;
        expect(strict({'test': f1}, {'test': f1})).to.be.true;
        expect(loose({'test': f1}, {'test': f1})).to.be.true;
        expect(loose({'test': f1}, {'test': f1})).to.be.true;
    });
    it('should return true for arrays of functions', () => {
        expect(strict([f1], [f2])).to.be.false;
    });
    it('should return true for identical console.log functions', () => {
        expect(strict(console.log, console.log)).to.be.true;
    });
    it('should return false for different functions', () => {
        expect(strict(function foo(): any {}, function bar(): any {})).to.be.false;
        expect(strict(function foo(): any {}, function bar(): any {})).to.be.false;
    });
    it('returns true for same functions', () => {
        function foo() {}
        expect(strict(foo, foo)).to.be.true;
        expect(loose(foo, foo)).to.be.true;
    });
});