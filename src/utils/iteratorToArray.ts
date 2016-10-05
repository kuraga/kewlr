/**
 * Convert iterators to an array
 *
 * @typedef {any[]} iteratorToArray
 * @property {[any]} [iterator]
 */
function iteratorToArray(generator: any): any[] {
  let generatorResult = generator.next();
  let accumulator = [ generatorResult.value ];
   while (generatorResult.done === false) {
     generatorResult = generator.next();
     accumulator.push(generatorResult.value);
   }
   return accumulator;
}
export default iteratorToArray;