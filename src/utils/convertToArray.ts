/**
 * Converts `map` or `set` to its key-value pairs.
 *
 * @typedef {Map | Set} convertToArray
 * @property {[ Map[] | Set[]]} [obj]
 */
function convertToArray<K, V>(obj: Map<K, V> | Set<K>): Map<K, V> | Set<K>[] {
    let list = new Array(obj.size);
    let i = 0;
    let iter = obj.keys();
    for (let next = iter.next(); !next.done; next = iter.next()) {
        list[i++] = next.value;
    }
    return list;
}

export default convertToArray;