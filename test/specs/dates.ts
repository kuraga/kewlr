import { strict, loose } from '../../src/kewlr';

const expect = chai.expect;

describe('dates', () => {

    it('should return true given two dates with the same time', () => {
        let dateA = new Date();
        expect(strict(dateA, new Date(dateA.getTime()))).to.be.true;
    });

    it('should return false for invalid dates', () => {
        let dateA = new Date();
        expect(strict(new Date('Keith'), new Date('Keith'))).to.be.false;
    });

    it('should return false for different date', () => {
        expect(strict(new Date('Thu, 01 Jan 1970 00:00:00 GMT'), new Date('Fri Dec 20 2013 16:21:18 GMT-0800 (PST)'))).to.be.false;
    });

    it('should compare date objects', () => {

        let date = new Date(2012, 4, 23);

        expect(strict(date, new Date(2012, 4, 23))).to.be.true;
        expect(strict(new Date('a'), new Date('b'))).to.be.false;
        expect(strict(date, new Date(2013, 3, 25))).to.be.false;
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