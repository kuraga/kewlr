import { strict, shallow, chai as match } from '../../src/kewlr';
const expect = chai.expect;
if (typeof ArrayBuffer === 'function') {
    describe('arrayBuffer', () => {
       it('should return true for arrays with same values', () => {
            expect(strict(
               new ArrayBuffer(1),
               new ArrayBuffer(1)
              )).to.be.true;
        });
       it('should return false for arrays with different lengths', () => {
            expect(strict(
               new ArrayBuffer(1),
               new ArrayBuffer(4)
              )).to.be.false;
        });
    });
}