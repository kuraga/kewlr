import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;

let f1: any = () => {};
let f2: any = () => {};

describe('functions', () => {

    it('should return true for same arrow functions',  () => {
        let arrow = eval('() => {}');
        expect(strict(arrow, arrow)).to.be.true;
        expect(loose(arrow, arrow)).to.be.true;
    });

    it('should return false for different arrow functions',  () => {
        expect(strict(eval('() => {}'), eval('() => {}'))).to.be.false;
        expect(loose(eval('() => {}'), eval('() => {}'))).to.be.false;
    });

    it('should fail if they have different names', () => {
        expect(strict(function a() {}, function b() {})).to.be.false;
    });

    it('should pass if they are both anonamous', () => {
        expect(strict(() => {}, () => {})).to.be.false;
        expect(loose(() => {}, () => {})).to.be.false;
    });

    it('handle the case where they have different argument names', () => {
        expect(strict(function (b: any): any { return b; }, function (a: any): any {return a})).to.be.false;
    })

    it('should compare functions as objects', () => {
        f1.title = 'sometitle';
        expect(strict(f1, f2)).to.be.false;
        expect(strict(f2, f1)).to.be.false;
        expect(strict(f1, f1)).to.be.true;
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
        expect(strict(function a (foo: any): any {}, function c (foo: any): any {})).to.be.false;
    });

    it('should return false for none-equal functions', () => {
        expect(strict(function a (foo: any): any {}, function c (foo: any): any {})).to.be.false;
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
        expect(strict(f1, f2)).to.be.false;
        expect(strict(f1, f2)).to.be.false;
    });

    it('should return true for same functions', () => {
        expect(strict(f1, f1)).to.be.true;
        expect(loose(f1, f1)).to.be.true;
    });
});