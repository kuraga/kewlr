import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

let obj1 = {}

describe('objects', () => {
    it('should return true for same object', () => {
        expect(strict(obj1, obj1)).to.be.true;
    });
    it('should return false for loosely equal object', () => {
        expect(strict([{a: 3}, {b: 4}], [{a: '3'}, {b: '4'}])).to.be.false;
    });
    it('should return false for not equal object', () => {
        expect(strict({x: 5, y: [6]},  {x: 5, y: 6})).to.be.false;
    });
    it('should return false for differing keys', () => {
        expect(strict({a: 1, b: 2}, {b: 1, c: 2})).to.be.false;
        expect(strict({b: 1, c: 2}, {a: 1, b: 2})).to.be.false;
        expect(loose({a: 1, b: 2}, {b: 1, c: 2})).to.be.false;
        expect(loose({b: 1, c: 2}, {a: 1, b: 2})).to.be.false;
    });
    it('should return true for various object combinations', () => {
        expect(strict({a: [2, 3], b: [4]}, {a: [2, 3], b: [4]})).to.be.true;
    });
    it('should return false for various object combinations', () => {
        expect(strict( [{a: 3}, {b: 4}], [{a: '3'}, {b: '4'}] )).to.be.false;
        expect(strict({x: 5, y: [6]}, {x: 5, y: 6})).to.be.false;
        expect(strict({x: 5, y: 6}, {x: 5, y: [6]})).to.be.false;
    });
    it('should return false with objects containing different literals', () => {
        expect(strict({ foo: 1, bar: 1 }, { foo: 1, bar: 2 })).to.be.false;
        expect(strict({ foo: 'bar' }, { foo: 'baz' })).to.be.false;
        expect(strict({ foo: { bar: 'foo' } }, { foo: { bar: 'baz' } })).to.be.false;
    });
    it('should notice objects with different shapes', () => {
        expect(strict({a: 1}, {a: 1, b: undefined})).to.be.false;
    });
    it('should return false with objects containing different keys', () => {
        expect(strict({ foo: 1, bar: 1 }, { foo: 1, baz: 2 })).to.be.false;
        expect(strict({ foo: 'bar' }, { bar: 'baz' })).to.be.false;
    });
    it('should work with objects that do not have the same keys', () => {
        const a = { a: 'a', b: 'b', c: 'c' };
        const b = { a: 'a', b: 'b', d: 'c' };
        expect(strict(a, b)).to.be.false;
        expect(strict(b, a)).to.be.false;
    });
    it('should handle object wrappers', () => {
        expect(loose(new Number(1), {})).to.be.false;
        expect(strict(new Number(1), {})).to.be.false;
        expect(strict({}, new Number(1))).to.be.false;
        expect(strict(new Boolean(true), {})).to.be.false;
        expect(strict(new String('a'), {0: 'a'})).to.be.false;
        expect(strict(new String('a'), {0: 'a'})).to.be.false;
        expect(strict({0: 'a'}, new String('a'))).to.be.false;
        expect(strict(new String('a'), ['a'])).to.be.false;
        expect(strict(['a'], new String('a'))).to.be.false;
    });
    it('should return true if objects containing identical primitives are equal', () => {
        expect(strict({a: 'Curly', b: 1, c: true}, {a: 'Curly', b: 1, c: true})).to.be.true;
        expect(strict({a: 'Curly', b: 1, c: true}, {a: 'Curly', b: 1, c: true})).to.be.true;
    });
    it('should return false if objects of identical sizes with different values are not equal', () => {
        expect(strict({a: 63, b: 75}, {a: 61, b: 55})).to.be.false;
    });
    it('should return false if objects of identical sizes with different property names are not equal', () => {
        expect(strict({a: 63, b: 75}, {a: 61, c: 55})).to.be.false;
    });
    it('should return false if objects of different sizes are not equal', () => {
        expect(strict({a: 1, b: 2}, {a: 1})).to.be.false;
    });
    it('should return false if commutative equality is implemented for objects', () => {
        expect(strict({a: 1}, {a: 1, b: 2})).to.be.false;
    });
    it('should return false if objects with identical keys and different values are not equivalent', () => {
        expect(strict({x: 1, y: void 0}, {x: 1, z: 2})).to.be.false;
    });
    it('should false for objects with different shapes', () => {
        expect(strict({a: 1}, {a: 1, b: undefined})).to.be.false;
    });
    it('should handle arrays of objects', () => {
        const a = [
            {
                id: 0,
                text: 'Array Object 0',
                boo: false
            },
            {
                id: 1,
                text: 'Array Object 1',
                boo: false
            }
        ];
        const b = [
            {
                id: 0,
                text: 'Array Object 0',
                boo: true // value of boo is changed to true here
            },
            {
                id: 1,
                text: 'Array Object 1',
                boo: false
            }
        ];
        expect(strict(b, a)).to.be.false;
        expect(strict(a, b)).to.be.false;
    });

    it('should handle nested objects and arrays', () => {
        let a = {
            name: new String('Donald Trump'),
            age: new Number(77),
            stooge: true,
            hobbies: ['acting'],
            film: {
                name: 'Sing a Song of Six Pants',
                release: new Date(1989, 9, 30),
                stars: [new String('Rich Harris'), 'Jon Doe'],
                minutes: new Number(16),
                seconds: 48
            }
        };

        // `B` contains equivalent nested objects and arrays.
        let b = {
            name: new String('Donald Trump'),
            age: new Number(77),
            stooge: true,
            hobbies: ['acting'],
            film: {
                name: 'Sing a Song of Six Pants',
                release: new Date(1989, 9, 30),
                stars: [new String('Richy Foo'), 'Jon Doe'],
                minutes: new Number(16),
                seconds: 48
            }
        };
        expect(loose(a, b)).to.be.false;
        expect(strict(a, b)).to.be.false;
    });

    it('should not care about key order recursively', () => {
        expect(strict(
            {x: {a: 1, b: 2}, y: {c: 3, d: 4}},
            {y: {d: 4, c: 3}, x: {b: 2, a: 1}}
        )).to.be.true;
        expect(strict(
            {x: {a: 1, b: 2}, y: {c: 3, d: 4}},
            {y: {d: 4, c: 3}, x: {b: 2, a: 1}}
        ), 'strict').to.be.true;
    });

    it('should not care about key order', () => {
        expect(strict(
            [
                {foo: {z: 100, y: 200, x: 300}},
                'bar',
                11,
                {baz: {d: 4, a: 1, b: 2, c: 3}}
            ],
            [
                {foo: {z: 100, y: 200, x: 300}},
                'bar',
                11,
                {baz: {d: 4, a: 1, b: 2, c: 3}}
            ]
        )).to.be.true;
    });

    it('returns true with objects containing same literals', () => {
        expect(strict({ foo: 1, bar: 2 }, { foo: 1, bar: 2 })).to.be.true;
        expect(strict({ foo: 'baz' }, { foo: 'baz' })).to.be.true;
    });

    it('returns true for deeply nested objects', () => {
       expect(strict({ foo: { bar: 'foo' } }, { foo: { bar: 'foo' } })).to.be.true;
       expect(loose({ foo: { bar: 'foo' } }, { foo: { bar: 'foo' } })).to.be.true;
    });

    it('returns false with objects containing different literals', () => {
        expect(strict({ foo: 1, bar: 1 }, { foo: 1, bar: 2 })).to.be.false;
        expect(strict({ foo: 'bar' }, { foo: 'baz' })).to.be.false;
        expect(strict({ foo: { bar: 'foo' } }, { foo: { bar: 'baz' } })).to.be.false;
    });

    it('returns false with objects containing different keys', () => {
        expect(strict({ foo: 1, bar: 1 }, { foo: 1, baz: 2 })).to.be.false;
        expect(strict({ foo: 'bar' }, { bar: 'baz' })).to.be.false;
    });

    it('should compare objects with shared property values', () => {
        let object1: any = {
            'a': [1, 2]
        };

        let object2: any = {
            'a': [1, 2],
            'b': [1, 2]
        };

        object1.b = object1.a;
        expect(strict(object1, object2)).to.be.true;
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

    it('should compare plain objects', () => {
        let object1: any = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };
        let object2: any = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };
        expect(strict(object1, object2)).to.be.true;
        object1 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
        object2 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
        expect(strict(object1, object2)).to.be.true;
        object1 = { 'a': 1, 'b': 2, 'c': 3 };
        object2 = { 'a': 3, 'b': 2, 'c': 1 };
        expect(strict(object1, object2)).to.be.false;
        object1 = { 'a': 1, 'b': 2, 'c': 3 };
        object2 = { 'd': 1, 'e': 2, 'f': 3 };
        expect(strict(object1, object2)).to.be.false;
        object1 = { 'a': 1, 'b': 2 };
        object2 = { 'a': 1, 'b': 2, 'c': 3 };
        expect(strict(object1, object2)).to.be.false;
    });

    it('should compare objects regardless of key order', () => {
        let object1 = { 'a': 1, 'b': 2, 'c': 3 };
        let object2 = { 'c': 3, 'a': 1, 'b': 2 };
        expect(strict(object1, object2)).to.be.true;
    });

    it('should compare object instances', () => {
        class Foo {
            public a: number;
            constructor() {
                this.a = 1;
            }
        }

        Foo.prototype.a = 1;

        class Bar {
            public a: number;
            constructor() {
                this.a = 1;
            }
        }
        Bar.prototype.a = 2;
        expect(strict(new Foo, new Foo)).to.be.true;
        expect(strict(new Foo, new Bar)).to.be.false;
        expect(strict({ 'a': 1 }, new Foo)).to.be.false;
        expect(strict({ 'a': 2 }, new Bar)).to.be.false;
    });

    it('should compare objects with constructor properties', () => {
        expect(strict({ 'constructor': 1 },   { 'constructor': 1 })).to.be.true;
        expect(strict({ 'constructor': [1] }, { 'constructor': [1] })).to.be.true;
        expect(strict({ 'constructor': 1 },   { 'constructor': '1' })).to.be.false;
        expect(strict({ 'constructor': [1] }, { 'constructor': ['1'] })).to.be.false;
        expect(strict({ 'constructor': Object }, {})).to.be.false;
    });

    it('should handle objects with no constructor property', () => {
        let a = Object.create(null)
        expect(strict(a, {})).to.be.false;
        expect(strict({}, a)).to.be.false;
        expect(strict(a, {a: 1})).to.be.false;
        expect(strict({a: 1}, a)).to.be.false;
    });

    it('when comparing primitives to composites', () => {
        expect(strict({}, undefined)).to.be.false;
        expect(strict(undefined, {})).to.be.false;
        expect(strict(new String, {})).to.be.false;
        expect(strict({}, new String)).to.be.false;
        expect(strict({}, new Number)).to.be.false;
        expect(strict(new Number, {})).to.be.false;
        expect(strict(new Boolean, {})).to.be.false;
        expect(strict({}, new Boolean)).to.be.false;
        expect(strict(new Date, {})).to.be.false;
        expect(strict({}, new Date)).to.be.false;
        expect(strict(RegExp, {})).to.be.false;
        expect(strict({}, RegExp)).to.be.false;
    });

    it('when comparing primitives to composites', () => {
        let a1: any = [1, 2, 3];
        let a2: any = [1, 2, 3];
        a1.a = 'test';
        a1.b = true;
        a2.b = true;
        a2.a = 'test';
        expect(strict({
            a: 4
        }, {
            a: 4,
            b: true
        })).to.be.false;
        expect(strict(Object.keys(a1), Object.keys(a2))).to.be.false;
        expect(strict({
            a: 4
        }, {
            a: 4
        })).to.be.true;
        expect(strict({
            a: 4,
            b: '2'
        }, {
            a: 4,
            b: '2'
        })).to.be.true;
        expect(strict([4], ['4'])).to.be.false;
        expect(strict(['a'], {
            0: 'a'
        })).to.be.false;
        expect(strict({
            a: 4,
            b: '1'
        }, {
            b: '1',
            a: 4
        })).to.be.true;
        expect(strict(a1, a2)).to.be.true;
        a1.d = 1;
        a2.c = 1;
        //   expect(strict(a1, a2)).to.be.false;
    });

    it('should handle object wrappers', () => {
        expect(strict(new Number(1), {})).to.be.false;
        expect(strict(new Boolean(true), {})).to.be.false;
        expect(strict(new String('a'), {0: 'a'})).to.be.false;
        expect(strict(new String('a'), {0: 'a'})).to.be.false;
        expect(strict(new String('a'), ['a'])).to.be.false;
    });
});