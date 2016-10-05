import { supportsUnicode, supportsSticky } from '../constants';

/**
 * Compare two regExp values and check if they are equivalent.
 *
 * @typedef {true | false} compareRegEx
 * @property {[RegExp]} [actual]
 * @property {RegExp} [expected]
 */
function compareRegEx(actual: RegExp, expected: RegExp): true | false {
 return actual.source === expected.source &&
            actual.global === expected.global &&
            actual.ignoreCase === expected.ignoreCase &&
            actual.multiline === expected.multiline &&
            actual.lastIndex === expected.lastIndex &&
            (!supportsUnicode || actual.unicode === expected.unicode) &&
            // Only supported by Firefox
            (!supportsSticky || actual.sticky === expected.sticky);
}
export default compareRegEx;