import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('Classes', () => {

    class A {
        public value: any;
        constructor(value: any) {
            this.value = value;
        }
    }
    class B {
        public value: any;
        constructor(value: any) {
            this.value = value;
        }
    }

    it('should return true for the same Class', () => {
        expect(strict(new A('A'), new A('A'))).to.be.true;
        expect(loose(new A('A'), new A('A'))).to.be.true;
    });

    it('should return false for different Class instance', () => {
        expect(strict(new A('A'), new B('B'))).to.be.false;
        expect(loose(new A('A'), new B('B'))).to.be.false;
    });
});