import { supportsUnicode, supportsSticky } from '../constants';

function compareRegEx(actual: any, expected: any): true | false {
 return actual.source === expected.source &&
            actual.global === expected.global &&
            actual.ignoreCase === expected.ignoreCase &&
            actual.multiline === expected.multiline &&
            actual.lastIndex === expected.lastIndex &&
            (!supportsUnicode || actual.unicode === expected.unicode) &&
            (!supportsSticky || actual.sticky === expected.sticky);
}
export default compareRegEx;