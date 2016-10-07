import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('dates', () => {
    it('should return true given two dates with the same time', () => {
        let dateA = new Date();
        expect(strict(dateA, new Date(dateA.getTime()))).to.be.true;
    });
    it('should return false for different date', () => {
        expect(strict(new Date('Thu, 01 Jan 1970 00:00:00 GMT'), new Date('Fri Dec 20 2013 16:21:18 GMT-0800 (PST)'))).to.be.false;
    });
    it('should handle dates', () => {
         expect(strict(new Date('1972-08-01'), null)).to.be.false;
         expect(strict(new Date('1972-08-01'), undefined)).to.be.false;
         expect(strict(new Date('1972-08-01'), new Date('1972-08-01'))).to.be.true;
         expect(strict( new Date(), new Date(2000, 3, 14))).to.be.false;
         expect(loose(new Date('1972-08-01'), new Date('1972-08-01'))).to.be.true;
         expect(loose( new Date(), new Date(2000, 3, 14))).to.be.false;
         expect(strict( new Date(), new Date(2000, 3, 14))).to.be.false;
         expect(strict( new Date(2000, 3, 14), new Date(2000, 3, 14))).to.be.true;
         expect(strict( new Date(2000, 3, 14), new Date(2000, 3, 14))).to.be.true;
        expect(strict({x: new Date('1972-08-01')}, {x: new Date('1972-08-01')})).to.be.true;
    });
});