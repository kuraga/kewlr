import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('Cyclic Structures', () => {
   it('should handle cyclic structures', () => {
        let a: any = [{abc: null}];
        let b: any = [{abc: null}];
        a[0].def = 'Harris';
        b[0].def = 'Harris';
        expect(strict(a, b)).to.be.true;
        expect(loose(a, b)).to.be.true;
        a[0].def = String('Larry');
        b[0].def = String('Curly');
        expect(strict(a, b)).to.be.false;
        expect(loose(a, b)).to.be.false;
        a = {foo: {b: {foo: {c: {foo: null}}}}};
        b = {foo: {b: {foo: {c: {foo: null}}}}};
        a.foo.b.foo.c.foo = a;
        b.foo.b.foo.c.foo = b;
        expect(strict(a, b)).to.be.true;
        expect(loose(a, b)).to.be.true;
    });
});