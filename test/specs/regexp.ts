import { strict, loose } from '../../src/kewlr';
const expect = chai.expect;
describe('RegExp', () => {

    it('should handle RegExps', () => {
        expect(strict(/a/, /a/)).to.be.true;
        expect(strict(/ab/, /a/)).to.be.false;
        expect(strict(/a/g, /a/g)).to.be.true;
        expect(strict(/a/igm, /a/igm)).to.be.true;
        expect(strict(/a/i, /a/)).to.be.false;
        expect(loose(/a/i, /a/)).to.be.false;
        expect(strict(/(?:)/gim, /(?:)/gim)).to.be.true;
        expect(strict(/(?:)/gi, /(?:)/ig)).to.be.true;
        expect(strict(new RegExp('a', 'g'), new RegExp('a', 'g'))).to.be.true;
        expect(strict(new RegExp('a', 'g'), /a/g)).to.be.true;
        expect(strict(/(?:)/g, /(?:)/gi)).to.be.false;
        expect(strict(/Moe/gim, /Curly/gim)).to.be.false;
        expect(strict(/foo/, /foo/)).to.be.true;
        expect(strict(/foo/, /foo/)).to.be.true;
        expect(strict(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' })).to.be.false;
        expect(strict(/x/, /y/)).to.be.false;
        expect(strict(/x/gi, /x/g)).to.be.false;
        expect(strict(/x/gim, /x/mgi)).to.be.true;
        expect(strict(/x/gim, /x/gim)).to.be.true;
        let re1 = /a/;
        re1.lastIndex = 3;
        expect(strict(/ab/, /a/)).to.be.false;
        expect(strict(/a/g, /a/)).to.be.false;
        re1.lastIndex = 0;
        expect(strict(re1, /a/)).to.be.true;
        expect(strict(/a/, /a/)).to.be.true;
        expect(strict(/a/g, /a/g)).to.be.true;
    });

    it('should return true for same', () => {
        expect(strict(/a/, /a/)).to.be.true;
        expect(strict(/a/g, /a/g)).to.be.true;
        expect(strict(/a/i, /a/i)).to.be.true;
        expect(strict(/a/m, /a/m)).to.be.true;
        expect(strict(/a/igm, /a/igm)).to.be.true;
        expect(strict(/a/mgi, /a/igm)).to.be.true;
    });

    it('should return false for different pattern', () => {
        expect(strict(/ab/, /a/)).to.be.false;
    });

    it('should return false for different flag: g', () => {
        expect(strict(/a/g, /a/)).to.be.false;
    });

    it('should return false for different flag: i', () => {
        expect(strict(/a/i, /a/)).to.be.false;
    });

    it('should return false for different flag: m', () => {
        expect(strict(/a/m, /a/)).to.be.false;
    });

    it('should return false for different flag order', () => {
        expect(strict(/a/igm, /a/im)).to.be.false;
    });

    it('should return false for different last index', () => {
        let re = /a/;
        re.lastIndex = 3;
        expect(strict(re, /a/)).to.be.false;
        expect(loose(re, /a/)).to.be.false;
    });

    it('should handle RegExps - unicode', () => {
        expect(strict(/\uFFFF/,  /\uFFFF/)).to.be.true;
        expect(strict(/\uFFFF/,  /\uFFFF/)).to.be.true;
        expect(strict(/[^a-z A-Z 0-9]/, /[^a-z A-Z 0-9]/)).to.be.true;
        expect(strict(/[^a-z A-Z 0-9]/, /[^a-z A-Z 0-9]/)).to.be.true;
        expect(strict(/[^a-z A-Z 0-9]/, /[^a-z A-Z 0-9]/)).to.be.true;
        expect(strict(/[^a-z A-Z 0-9]/,  /\uFFFF/)).to.be.false;
    });

    it('should return true given two regexes with the same source', () => {
        expect(strict(/\s/, /\s/)).to.be.true;
        expect(strict(/\s/, new RegExp('\\s'))).to.be.true;
    });

    it('should return false when the regexp source doesn\'t match', () => {
        expect(strict(/foo/gim, /bar/mig)).to.be.false;
        expect(loose(/foo/gim, /bar/mig)).to.be.false;
    });
});