import { strict, shallow, chai as match } from '../../src/kewlr';
const expect = chai.expect;
if (typeof Int32Array === 'function' && typeof DataView === 'function') {
    describe('dataview', () => {
       it('should return true for same DataViews', () => {
            expect(strict(
               new DataView(new Int32Array([1, 2, 3, 4, 5]).buffer),
               new DataView(new Int32Array([1, 2, 3, 4, 5]).buffer)
              )).to.be.true;
        });
        it('should return false for different DataViews', () => {
            expect(strict(
               new DataView(new Int32Array([1, 2, 3, 4, 5]).buffer),
               new DataView(new Int32Array([5, 4, 3, 2, 1]).buffer),
              )).to.be.false;
        });
        it('should return true for arrays with same values', () => {
            let dataViewA = new DataView(new ArrayBuffer(4));
            dataViewA.setUint8(0, 1);
            dataViewA.setUint8(1, 2);
            dataViewA.setUint8(2, 3);
            dataViewA.setUint8(3, 4);
            let dataViewB = new DataView(new ArrayBuffer(4));
            dataViewB.setUint8(0, 1);
            dataViewB.setUint8(1, 2);
            dataViewB.setUint8(2, 3);
            dataViewB.setUint8(3, 4);
            expect(strict(dataViewA, dataViewB)).to.be.true;
            expect(strict(dataViewB, dataViewA)).to.be.true;
        });
        it('should return false for arrays with different lengths', () => {
            expect(strict(new DataView(new ArrayBuffer(4)), new DataView(new ArrayBuffer(1)))).to.be.false;
            expect(strict(new DataView(new ArrayBuffer(1)), new DataView(new ArrayBuffer(11)))).to.be.false;
            expect(match(new DataView(new ArrayBuffer(1)), new DataView(new ArrayBuffer(11)))).to.be.false;
            expect(shallow(new DataView(new ArrayBuffer(1)), new DataView(new ArrayBuffer(11)))).to.be.false;
        });
        it('should return false for arrays with different values', () => {
            let dataViewA = new DataView(new ArrayBuffer(4));
            dataViewA.setUint8(0, 1);
            dataViewA.setUint8(1, 2);
            dataViewA.setUint8(2, 3);
            dataViewA.setUint8(3, 4);
            let dataViewB = new DataView(new ArrayBuffer(4));
            dataViewB.setUint8(0, 5);
            dataViewB.setUint8(1, 6);
            dataViewB.setUint8(2, 7);
            dataViewB.setUint8(3, 8);
            expect(strict(dataViewA, dataViewB)).to.be.false;
            expect(strict(dataViewB, dataViewA)).to.be.false;
            expect(shallow(dataViewA, dataViewB)).to.be.false;
            expect(shallow(dataViewB, dataViewA)).to.be.false;
        });
    });
}