import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('ECMA 2016', () => {

    it('should return true for same arrow functions',  () => {
        let arrow = eval('() => {}');
        expect(strict(arrow, arrow)).to.be.true;
        expect(loose(arrow, arrow)).to.be.true;
    });

    it('should return false for different arrow functions',  () => {
        expect(strict(eval('() => {}'), eval('() => {}'))).to.be.false;
        expect(loose(eval('() => {}'), eval('() => {}'))).to.be.false;
    });
});