import { strict, shallow } from '../../src/kewlr';

const expect = chai.expect;

let circular1: any = {foo: 1};
let circular2: any = {foo: 1};
let circular3: any = {foo: 1};
circular1.a = circular1;
circular2.a = circular2;
circular3.b = circular3;
let circular: any = ['a', 'b'];
circular.push(circular);

describe('circular references', () => {

    it('should not blow up on circular data structures', () => {
        let x1: any = {z: 4};
        let y1: any = {x: x1};
        x1.y = y1;
        let x2: any = {z: 4};
        let y2: any = {x: x2};
        x2.y = y2;
        expect(strict(x1, x2)).to.be.true;
    });

    it('should not cause a stack overflow with circular objects', () => {
        let a1: any = {};
        let a2: any = {};
        let b1: any = {a: a1};
        let b2: any = {a: a2};
        a1.b = b1;
        a2.b = b2;
        expect(strict(a1, a2)).to.be.true;
    });

    it('should not mask RangeError from underlying assert', () => {
        class Circular {
            public test: any;
            constructor() {
                this.test = this;
            }
        }
        let a = new Circular();
        let b = new Circular();
        expect(strict(a, b)).to.be.true;
    });

    it('should compare objects with complex circular references', () => {
        let object1: any = {
            'foo': { 'b': { 'c': { 'd': {} } } },
            'bar': { 'a': 2 }
        };
        let object2: any = {
            'foo': { 'b': { 'c': { 'd': {} } } },
            'bar': { 'a': 2 }
        };
        object1.foo.b.c.d = object1;
        object1.bar.b = object1.foo.b;
        object2.foo.b.c.d = object2;
        object2.bar.b = object2.foo.b;
        expect(strict(object1, object2)).to.be.true;
    });

    it('should work when object has circular reference', () => {
        class Circular {
            public circularRef: any;
            constructor() {
                this.circularRef = this;
            }
        }
        const a = new Circular();
        const b = new Circular();
        expect(strict(a, b)).to.be.true;
        expect(shallow(a, b)).to.be.true;
    });

    it('should handle circular arrays', () => {
        let circular: any = ['a', 'b'];
        circular.push(circular);
        expect(strict([circular, 'c'], [circular, 'd'])).to.be.false;
    });

    it('should return true if circular reference match', () => {
        expect(strict(circular1, circular2)).to.be.true;
        expect(strict(circular2, circular1)).to.be.true;
    });

    it('should return false if circular references don\'t match', () => {
        expect(strict(circular1, circular3)).to.be.false;
    });

    it('should return false for one circular', () => {
        expect(strict(circular1, {foo: 1, a: {}})).to.be.false;
    });

    it('should return true for complex Circular References', () => {
        let a: any = {foo: {b: {foo: {c: {foo: null}}}}};
        let  b: any = {foo: {b: {foo: {c: {foo: null}}}}};
        a.foo.b.foo.c.foo = a;
        b.foo.b.foo.c.foo = b;
        expect(strict(a, b)).to.be.true;
    });
});