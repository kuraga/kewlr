/**
 * Gets the index at which the first occurrence of `value` is found in `array`.
 * If `fromIndex` is negative, it's used as the offset from the end of `array`.
 *
 * @typedef {any} indexOf
 * @property {[any[]]} [array]
 * @property {any} [value]
 * @property {number} [fromIndex]
 */
export default <T>(array: Array<T>, value: any) => {

    let length = array ? array.length : 0;
    let index = - 1,
        isReflexive = value === value;

    while (++index < length) {

        let other = array[index];

        if ((isReflexive ? other === value : other !== other)) {
            return index;
        }
    }
    return -1;
};