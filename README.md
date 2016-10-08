# Kewlr

[![Build Status](https://travis-ci.org/zubuzon/kewlr.svg?branch=master)](https://travis-ci.org/zubuzon/kewlr)
[![Coverage Status](https://coveralls.io/repos/github/zubuzon/kewlr/badge.svg?branch=master)](https://coveralls.io/github/zubuzon/kewlr?branch=master)

`Kewlr` is a module which you can use to determine if two values are equal to each others. It offers two modes - `shallow` and `strict`, and
it aim to be the fastest `deepEqual` algorithm, and support everything that is possible to support.

It should be safe to use this module in production, and it works both for node and the browser.

# Features

- High performance
- 100% accurate
- Follows ECMA standards
- Works for both NodejS and browsers
- shallow, chai and strict mode
- [`Core-js`](https://github.com/zloirock/core-js) compatible
- [`Chai`](https://github.com/chaijs/chai) compatible
- [`Browserify`](http://browserify.org/) compatible
- Babel and Bublé compatible
- fixes all known cross-browser issues

- supports large data sets

# Install

```js
$ npm install --save Kewlr
```

# Usage

Include `Kewlr` in your project like this:

```js

// Node 5.x or newer.
var { strict, shallow } = require('kewlr');
```
or

```js
import { strict, shallow } from 'kewlr';
```

# API

Kewlr let you import two different functions, so you can choose between either `strict` and `shallow` mode when you include this module into your project.
Each of the functions takes two arguments of any type, and returns a boolean result. Primitive types are equal if they are `===`.
While composite types, i.e. `Objects` and `Arrays`, are considered equal if they have both the same structure and each sub-value is also equal.
Circular references in composite structures are supported.

### strict(actual, expected)

- `actual` - Value to compare against `actual`
- `expected` - Value to compare against `expected`

**Returns:** Boolean indicating whether or not `actual` is the same as `expected`.

Same for `shallow` and `chai` mode.

## Differences between shallow and strict mode

The differences between `shallow` and `strict` mode are mainly the use of tripple equals. And also that the strict mode does a deeply nested `sameValue`
equality between two objects of any type, and performs a [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) comparison
between two values to determine if they are equivalent.

`chai` mode is is what the name says - turns Kewlr into Chai'r deepEqual module with Kewlrs performance under the hood.

```js
shallow({}, []) // => true

strict({}, []) // => false

shallow({ 0: 'a', 1: 'b' }, ['a', 'b']) // => true

strict({ 0: 'a', 1: 'b' }, ['a', 'b'])  // => false

shallow(1, '1') // => true

strict(1, '1') // => false
```

# Examples

## Different structure:

```js
shallow({ x : 2016, y : [2017] }, { x : 2016}) // => false
struct({ x : 2016, y : [2017] }, { x : 2016}) // => false
```

## Same structure, different values:

```js
shallow( { x : 2016, y : [6] }, { x : 2017}) // => false
strict( { x : 2016, y : [6] }, { x : 2017}) // => false
```

## Primitives:

```js
shallow({ x : 5, y : [6] },{ x : 5}) // => false
strict({ x : 5, y : [6] },{ x : 5}) // => false
```

## Generators

```js
let generator = eval('var set = 0; function * generator() { yield set++; }; generator');

shallow(generator(), generator()); // => true
strict(generator(), generator()); // => true
```

## Symbols()

```js
strict('abc'[Symbol.iterator](), 'abc'[Symbol.iterator]()) // => true
```

## Spread operator

```js

let x = new Map();
    x.set('foo', 'bar');
let y = new Map();
    y.set('bar', 'baz');

  shallow([...y], [...x]) // => false
```

## Mixed

```js

shallow(a, 'b') // false
shallow({a: 0}, {a: '0'}, 'strict') // false
shallow({a: 1}, {a: 1}) // true
shallow({a: 1, b: 2}, {b: 2, a: 1}) // true
shallow(Error('a'), Error('a')) // true
shallow(Error('a'), Error('b')) // false
strict(Error('a'), Error('b')) // false
strict({ a : [ 2, 3 ], b : [ 4 ] }, { a : [ 2, 3 ], b : [ 4 ] }) // => true

let s = Symbol();

shallow(s, s); // true

let generator = eval('var set = 0; function * generator() { yield set++; }; generator');

shallow(generator(), generator()); // => true
strict(generator(), generator()); // => true

```

# Benchmark

Benchmark comparison against two of the most popular libraries. `Chai` is only fast on primitives, and also
contain cross-browser issues.

`Lodash` is fast on primitives too, but doesn't support all the same features as `Chai` and `Kewlr`.

* /NI = Not Implemented

### Chai


```js

// Chai
NaN                         x 22,792,558 ops/sec ±0.79% (95 runs sampled)
string literal              x 50,768,598 ops/sec ±0.97% (90 runs sampled)
array literal               x 328,371 ops/sec ±0.71% (97 runs sampled)
boolean literal             x 4,150,564 ops/sec ±1.05% (87 runs sampled)
object literal              x 146,757 ops/sec ±1.69% (94 runs sampled)
object from null            x 274,394 ops/sec ±1.30% (94 runs sampled)
regex literal               x 337,200 ops/sec ±1.33% (95 runs sampled)
String                      : /NI
Boolean                     : /NI
Number                      : /NI
Number literal              x 29,565,083 ops/sec ±1.08% (90 runs sampled)
null                        x 54,197,476 ops/sec ±1.67% (94 runs sampled)
undefined                   x 53,168,333 ops/sec ±1.67% (93 runs sampled)
buffer                      : /NI
date                        x 353,723 ops/sec ±1.53% (95 runs sampled)
map                         x 344,276 ops/sec ±2.07% (92 runs sampled)
regex constructor           x 340,594 ops/sec ±1.07% (52 runs sampled)
set                         x 281,988 ops/sec ±1.38% (95 runs sampled)
string constructor          : /NI
arguments                   x 322,111 ops/sec ±1.71% (87 runs sampled)
weakmap                     x 367,184 ops/sec ±1.37% (92 runs sampled)
string literal (differing)  x 41,720,813 ops/sec ±0.88% (90 runs sampled)
array literal (differing)   x 204,749 ops/sec ±1.20% (91 runs sampled)
boolean literal (differing) x 41,573,017 ops/sec ±1.61% (93 runs sampled)
object literal (differing)  x 167,677 ops/sec ±1.66% (95 runs sampled)
regex literal (differing)   x 343,388 ops/sec ±1.08% (95 runs sampled)
number literal (differing)  : /NI
null & undefined            x 47,523,010 ops/sec ±1.09% (94 runs sampled)
buffer (differing)          x 275,328 ops/sec ±1.88% (93 runs sampled)
date (differing)            x 352,818 ops/sec ±1.14% (96 runs sampled)
number (differing)          x 346,692 ops/sec ±1.34% (93 runs sampled)
error                       x 432,609 ops/sec ±1.82% (93 runs sampled)
map (differing)             x 203,748 ops/sec ±2.00% (93 runs sampled)
regex ctor (differing)      x 351,938 ops/sec ±1.96% (92 runs sampled)
set (differing)             x 174,564 ops/sec ±1.65% (91 runs sampled)
weakset                     x 398,499 ops/sec ±1.95% (65 runs sampled)
arguments (differing)       x 198,811 ops/sec ±1.11% (95 runs sampled)
function                    x 500,304 ops/sec ±1.28% (96 runs sampled)
promise                     x 334,162 ops/sec ±1.94% (86 runs sampled)
arrow function (differing)  x 471,504 ops/sec ±1.96% (85 runs sampled)
```
### Kewlr

```js
NaN                         x 59,709,975 ops/sec ±0.81% (95 runs sampled)
string literal              x 69,543,087 ops/sec ±0.49% (95 runs sampled)
array literal               x 1,089,537 ops/sec ±0.95% (90 runs sampled)
boolean literal             x 60,163,978 ops/sec ±0.39% (96 runs sampled)
object literal              x 930,152 ops/sec ±3.25% (90 runs sampled)
object from null            x 778,688 ops/sec ±0.64% (97 runs sampled)
regex literal               x 6,072,546 ops/sec ±1.25% (96 runs sampled)
String                      x 717,026 ops/sec ±1.30% (94 runs sampled)
Boolean                     x 981,285 ops/sec ±1.76% (91 runs sampled)
Number                      x 1,000,314 ops/sec ±2.52% (87 runs sampled)
Number literal              x 63,529,570 ops/sec ±3.69% (28 runs sampled)
null                        x 63,308,107 ops/sec ±1.51% (89 runs sampled)
undefined                   x 59,706,867 ops/sec ±1.11% (92 runs sampled)
buffer                      x 4,612,967 ops/sec ±1.37% (95 runs sampled)
date                        x 6,198,572 ops/sec ±1.27% (94 runs sampled)
map                         x 944,503 ops/sec ±0.96% (93 runs sampled)
regex constructor           x 6,278,648 ops/sec ±1.19% (92 runs sampled)
set                         x 890,192 ops/sec ±2.20% (90 runs sampled)
string constructor          x 697,697 ops/sec ±0.98% (95 runs sampled)
arguments                   x 589,692 ops/sec ±2.06% (89 runs sampled)
string literal (differing)  x 31,487,229 ops/sec ±1.79% (58 runs sampled)
array literal (differing)   x 990,156 ops/sec ±1.42% (92 runs sampled)
boolean literal (differing) x 36,656,542 ops/sec ±2.29% (94 runs sampled)
object literal (differing)  x 720,765 ops/sec ±1.47% (86 runs sampled)
regex literal (differing)   x 8,193,479 ops/sec ±2.42% (91 runs sampled)
null & undefined            x 36,199,474 ops/sec ±1.07% (93 runs sampled)
buffer (differing)          x 4,796,391 ops/sec ±1.18% (97 runs sampled)
date (differing)            x 6,917,389 ops/sec ±1.73% (90 runs sampled)
number (differing)          x 684,334 ops/sec ±3.01% (84 runs sampled)
error                       x 1,636,912 ops/sec ±0.98% (85 runs sampled)
map (differing)             x 787,028 ops/sec ±1.95% (79 runs sampled)
regex ctor (differing)      x 9,720,439 ops/sec ±2.17% (85 runs sampled)
set                         x 890,192 ops/sec ±2.20% (90 runs sampled)
weakmap                     x 1,614,372 ops/sec ±1.35% (83 runs sampled)
weakset                     x 1,402,493 ops/sec ±1.90% (91 runs sampled)
arguments (differing)       x 604,466 ops/sec ±1.10% (78 runs sampled)
function                    x 2,506,213 ops/sec ±1.55% (94 runs sampled)
promise                     x 1,377,720 ops/sec ±1.91% (85 runs sampled)
arrow function (differing)  x 3,195,175 ops/sec ±0.92% (83 runs sampled)
generator func (differing)  x 2,714,716 ops/sec ±1.67% (81 runs sampled)
```
### Lodash

```js
NaN                         x 45,883,884 ops/sec ±1.24% (96 runs sampled)
string literal              x 70,501,125 ops/sec ±1.28% (91 runs sampled)
array literal               x 2,018,210 ops/sec ±0.96% (95 runs sampled)
boolean literal             x 54,537,763 ops/sec ±0.95% (97 runs sampled)
object literal              x 393,746 ops/sec ±1.66% (56 runs sampled)
object from null            x 433,950 ops/sec ±4.73% (92 runs sampled)
regex literal               x 479,453 ops/sec ±2.65% (89 runs sampled)
String                      x 731,572 ops/sec ±1.00% (95 runs sampled)
Boolean                     x 769,237 ops/sec ±2.40% (67 runs sampled)
Number                      x 783,885 ops/sec ±1.50% (94 runs sampled)
Number literal              x 66,340,912 ops/sec ±1.07% (91 runs sampled)
null                        x 62,093,251 ops/sec ±1.70% (94 runs sampled)
undefined                   x 61,319,209 ops/sec ±2.00% (69 runs sampled)
buffer                      x 542,135 ops/sec ±1.57% (90 runs sampled)
date                        x 620,836 ops/sec ±2.25% (82 runs sampled)
map                         x 168,955 ops/sec ±1.62% (85 runs sampled)
regex constructor           x 493,656 ops/sec ±3.32% (60 runs sampled)
set                         x 269,685 ops/sec ±1.25% (87 runs sampled)
string constructor          x 726,737 ops/sec ±1.74% (85 runs sampled)
arguments                   x 107,957 ops/sec ±1.35% (88 runs sampled)
string literal (differing)  x 27,173,663 ops/sec ±1.15% (97 runs sampled)
array literal (differing)   x 1,408,666 ops/sec ±1.14% (97 runs sampled)
boolean literal (differing) x 36,127,814 ops/sec ±1.31% (94 runs sampled)
object literal (differing)  x 422,608 ops/sec ±1.19% (94 runs sampled)
regex literal (differing)   x 407,979 ops/sec ±2.82% (90 runs sampled)
number literal (differing)  : /NI
null & undefined            x 44,806,635 ops/sec ±1.17% (96 runs sampled)
buffer (differing)          x 976,019 ops/sec ±1.52% (94 runs sampled)
date (differing)            x 683,029 ops/sec ±1.93% (94 runs sampled)
number (differing)          : /NI
null & undefined            x 45,517,618 ops/sec ±2.06% (82 runs sampled)
buffer (differing)          x 923,542 ops/sec ±1.66% (86 runs sampled)
date (differing)            x 619,294 ops/sec ±1.60% (88 runs sampled)
number (differing)          x 663,239 ops/sec ±1.96% (86 runs sampled)
error                       : /NI
map (differing)             x 184,891 ops/sec ±2.04% (87 runs sampled)
regex ctor (differing)      x 465,092 ops/sec ±1.24% (84 runs sampled)
set (differing)             x 346,701 ops/sec ±1.61% (89 runs sampled)
weakmap                     x 1,205,527 ops/sec ±1.89% (86 runs sampled)
weakset                     x 1,267,413 ops/sec ±1.20% (89 runs sampled)
arguments (differing)       x 130,444 ops/sec ±2.34% (67 runs sampled)
function                    x 1,272,566 ops/sec ±1.80% (93 runs sampled)
promise                     x 1,142,367 ops/sec ±1.39% (86 runs sampled)
arrow function (differing)  x 1,221,315 ops/sec ±1.00% (87 runs sampled)
generator func (differing)  x 1,158,629 ops/sec ±1.14% (85 runs sampled)
```

# Chai mode

Kewlr supports a `chai` mode. This mode is 100% compatible with Chai's deepEqual module, but with Kewlrs performance under the hood.

### Benchmark

* /NI = Not Implemented

```js

// Chai (*original*)

NaN                            x 23,135,184 ops/sec ±1.41% (95 runs sampled)
string literal              x 52,196,723 ops/sec ±0.32% (96 runs sampled)
array literal               x 369,912 ops/sec ±1.55% (90 runs sampled)
boolean literal             x 47,495,619 ops/sec ±1.29% (93 runs sampled)
object literal              x 251,964 ops/sec ±1.98% (93 runs sampled)
object from null            x 294,651 ops/sec ±1.16% (96 runs sampled)
regex literal               x 321,041 ops/sec ±1.17% (96 runs sampled)
String                      : /NI
Boolean                     : /NI
Number                      : /NI
Number literal              x 30,095,668 ops/sec ±1.06% (95 runs sampled)
null                        x 52,542,828 ops/sec ±0.91% (92 runs sampled)
undefined                   x 52,576,269 ops/sec ±0.66% (93 runs sampled)
buffer                      : /NI
date                        x 374,308 ops/sec ±1.45% (89 runs sampled)
map                         x 350,373 ops/sec ±2.02% (92 runs sampled)
regex constructor           x 281,013 ops/sec ±1.15% (93 runs sampled)
set                         x 281,116 ops/sec ±1.61% (88 runs sampled)
string constructor          : /NI
arguments                   x 328,653 ops/sec ±1.69% (96 runs sampled)
promise                     x 391,043 ops/sec ±2.25% (92 runs sampled)
weakmap                     x 422,815 ops/sec ±1.32% (96 runs sampled)
string literal (differing)  x 38,615,393 ops/sec ±1.85% (95 runs sampled)
array literal (differing)   x 207,455 ops/sec ±1.78% (91 runs sampled)
boolean literal (differing) x 42,698,174 ops/sec ±1.20% (95 runs sampled)
object literal (differing)  x 128,334 ops/sec ±2.27% (90 runs sampled)
regex literal (differing)   x 304,894 ops/sec ±1.54% (93 runs sampled)
number literal (differing)  : /NI
null & undefined            x 44,412,001 ops/sec ±1.13% (92 runs sampled)
buffer (differing)          x 307,443 ops/sec ±1.57% (94 runs sampled)
date (differing)            x 360,143 ops/sec ±1.34% (94 runs sampled)
number (differing)            x 340,573 ops/sec ±1.77% (90 runs sampled)
error                       x 415,895 ops/sec ±1.06% (96 runs sampled)
map (differing)             x 191,026 ops/sec ±2.30% (91 runs sampled)
regex ctor (differing)      x 321,128 ops/sec ±0.76% (58 runs sampled)
set (differing)             x 169,544 ops/sec ±1.40% (94 runs sampled)
string ctor (differing)     x 312,103 ops/sec ±1.40% (93 runs sampled)
weakset                     x 314,585 ops/sec ±1.25% (93 runs sampled)
arguments (differing)       x 205,860 ops/sec ±1.83% (90 runs sampled)
function                    x 450,480 ops/sec ±1.91% (93 runs sampled)
arrow function (differing)  x 459,619 ops/sec ±1.82% (91 runs sampled)

// Kewlr - Chai mode
NaN                         x 46,946,316 ops/sec ±0.50% (95 runs sampled)
string literal              x 49,497,748 ops/sec ±0.52% (98 runs sampled)
array literal               x 911,174 ops/sec ±0.84% (94 runs sampled)
boolean literal             x 44,945,903 ops/sec ±0.32% (100 runs sampled)
object literal              x 882,087 ops/sec ±0.87% (95 runs sampled)
object from null            x 544,655 ops/sec ±0.64% (92 runs sampled)
regex literal               x 5,934,119 ops/sec ±0.47% (98 runs sampled)
String                      x 688,034 ops/sec ±2.59% (92 runs sampled)
Boolean                     x 929,798 ops/sec ±0.69% (96 runs sampled)
Number                      x 897,256 ops/sec ±0.57% (92 runs sampled)
Number literal              x 48,896,797 ops/sec ±0.85% (95 runs sampled)
null                        x 47,105,902 ops/sec ±0.72% (96 runs sampled)
undefined                   x 46,435,714 ops/sec ±0.71% (92 runs sampled)
buffer                      : /NI
date                        x 8,181,286 ops/sec ±0.67% (96 runs sampled)
map                         x 932,079 ops/sec ±0.66% (94 runs sampled)
regex constructor           x 6,296,232 ops/sec ±0.40% (95 runs sampled)
set                         x 907,274 ops/sec ±0.87% (95 runs sampled)
string constructor          x 659,903 ops/sec ±0.58% (94 runs sampled)
arguments                   x 576,035 ops/sec ±0.80% (95 runs sampled)
promise                     x 999,637 ops/sec ±0.76% (94 runs sampled)
weakmap                     x 1,164,366 ops/sec ±0.63% (96 runs sampled)
string literal (differing)  x 38,990,103 ops/sec ±0.45% (93 runs sampled)
array literal (differing)   x 894,618 ops/sec ±1.57% (94 runs sampled)
boolean literal (differing) x 32,678,290 ops/sec ±1.87% (96 runs sampled)
object literal (differing)  x 541,684 ops/sec ±1.05% (95 runs sampled)
regex literal (differing)   x 8,576,171 ops/sec ±0.45% (99 runs sampled)
number literal (differing)  : /NI
null & undefined            x 44,298,328 ops/sec ±0.56% (97 runs sampled)
buffer (differing)          x 4,888,593 ops/sec ±1.59% (95 runs sampled)
date (differing)            x 8,095,821 ops/sec ±0.62% (96 runs sampled)
number (differing)            x 775,817 ops/sec ±2.33% (89 runs sampled)
error                       x 1,262,244 ops/sec ±1.62% (93 runs sampled)
map (differing)             x 949,984 ops/sec ±1.80% (95 runs sampled)
regex ctor (differing)      x 8,176,987 ops/sec ±2.31% (92 runs sampled)
set (differing)             x 857,345 ops/sec ±1.45% (92 runs sampled)
string ctor (differing)     : /NI
weakset                     x 1,110,013 ops/sec ±0.76% (96 runs sampled)
arguments (differing)       x 466,570 ops/sec ±1.13% (92 runs sampled)
function                    x 2,184,845 ops/sec ±1.63% (85 runs sampled)
arrow function (differing)  x 2,367,934 ops/sec ±2.64% (94 runs sampled)
generator func (differing)  x 2,241,420 ops/sec ±1.65% (95 runs sampled)
```
