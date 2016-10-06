# Kewlr

[![Build Status](https://travis-ci.org/zubuzon/kewlr.svg?branch=master)](https://travis-ci.org/zubuzon/kewlr)
[![Coverage Status](https://coveralls.io/repos/github/zubuzon/kewlr/badge.svg?branch=master)](https://coveralls.io/github/zubuzon/kewlr?branch=master)

`Kewlr` is a module which you can use to determine if two values are equal to each others. It offers two modes - `loose` and `strict`, and
it aim to be the fastest `deepEqual` algorithm, and support everything that is possible to support.

It should be safe to use this module in production, and it works both for node and the browser.

# Features

- High performance
- Follows ECMA standards
- Works for both NodejS and browsers
- loose and strict mode
- [`Core-js`](https://github.com/zloirock/core-js) compatible
- Browserify compatible
- Babel and Bublé compatible
- fixes all known cross-browser issues

# Install

```js
$ npm install --save Kewlr
```

# Usage

Include `Kewlr` in your project like this:

```js

// Node 5.x or newer.
var { strict, loose } = require('kewlr');
```
or

```js
import { strict, loose } from 'kewlr';
```

# API

Boogy let you import two different functions, so you can choose between either `strict` and `loose` mode when you include this module into your project.
Each of the functions takes two arguments of any type, and returns a boolean result. Primitive types are equal if they are `===`.
While composite types, i.e. `Objects` and `Arrays`, are considered equal if they have both the same structure and each sub-value is also equal.
Circular references in composite structures are supported.

### loose(actual, expected)

- `actual` - Value to compare against `actual`
- `expected` - Value to compare against `expected`

**Returns:** Boolean indicating whether or not `actual` is the same as `expected`.

Same for `strict` mode.

# Examples


```js

loose(a, 'b') // false
loose({a: 0}, {a: '0'}, 'strict') // false
loose({a: 1}, {a: 1}) // true
loose({a: 1, b: 2}, {b: 2, a: 1}) // true
loose(Error('a'), Error('a')) // true
loose(Error('a'), Error('b')) // false
strict(Error('a'), Error('b')) // false

let s = Symbol();

loose(s, s); // true

```
# Cross browser issues

Too many cross-browser bugs are solved by this module, and this kills the performance. If only NodejS environment, the performance could
have been improved even more. Based on this the `NodeJS core assert module` is faster in many areas, but doesn't work in browser, and
are also missing a lot of features.

`Lodash` and `Kewlr` also support large data sets.

# Benchmark

Benchmark comparison against two of the most popular libraries. `Chai` is only fast on primitives, and also
contain cross-browser issues.

`Lodash` is fast on primitives too, but doesn't support all the same features as `Chai` and `Kewlr`.

### Chai


```js

// Chai
NaN                         x 23,829,641 ops/sec ±3.58% (84 runs sampled)
string literal              x 61,296,329 ops/sec ±1.42% (30 runs sampled)
array literal               x 349,466 ops/sec ±1.69% (85 runs sampled)
boolean literal             x 4,150,564 ops/sec ±1.05% (87 runs sampled)
object literal              x 244,900 ops/sec ±2.29% (71 runs sampled)
object from null            x 420,087 ops/sec ±1.00% (88 runs sampled)
regex literal               x 491,893 ops/sec ±1.11% (88 runs sampled)
number literal              x 29,300,035 ops/sec ±1.72% (85 runs sampled)
null                        x 55,906,401 ops/sec ±2.45% (51 runs sampled)
undefined                   x 58,080,320 ops/sec ±1.51% (75 runs sampled)
buffer                     :
date                        x 368,873 ops/sec ±1.26% (87 runs sampled)
map                         x 300,619 ops/sec ±2.77% (57 runs sampled)
regex constructor           x 486,111 ops/sec ±1.46% (87 runs sampled)
set                         x 394,060 ops/sec ±1.30% (87 runs sampled)
string constructor         :
arguments                   x 322,111 ops/sec ±1.71% (87 runs sampled)
string literal (differing)  x 44,890,208 ops/sec ±2.34% (60 runs sampled)
array literal (differing)   x 225,852 ops/sec ±1.05% (87 runs sampled)
boolean literal (differing) x 49,000,873 ops/sec ±2.30% (50 runs sampled)
object literal (differing)  x 158,547 ops/sec ±2.35% (84 runs sampled)
regex literal (differing)   x 333,701 ops/sec ±2.66% (14 runs sampled)
number literal (differing) :
null & undefined            x 49,623,434 ops/sec ±1.25% (89 runs sampled)
buffer (differing)          x 324,553 ops/sec ±3.06% (62 runs sampled)
date (differing)            x 376,684 ops/sec ±1.06% (88 runs sampled)
number (differing)          x 551,919 ops/sec ±1.10% (88 runs sampled)
error                       x 423,087 ops/sec ±1.89% (85 runs sampled)
map (differing)             x 109,855 ops/sec ±1.35% (88 runs sampled)
regex ctor (differing)      x 340,930 ops/sec ±2.42% (85 runs sampled)
set (differing)             x 209,567 ops/sec ±1.29% (85 runs sampled)
string ctor (differing)     x 569,011 ops/sec ±1.16% (89 runs sampled)
weakmap                     x 427,634 ops/sec ±2.08% (81 runs sampled)
weakset                     x 390,694 ops/sec ±1.47% (67 runs sampled)
arguments (differing)       x 222,242 ops/sec ±1.27% (88 runs sampled)
function                    x 505,497 ops/sec ±6.64% (43 runs sampled)
promise                     x 334,162 ops/sec ±1.94% (86 runs sampled)
arrow function (differing)  x 471,504 ops/sec ±1.96% (85 runs sampled)
```
### Kewlr

```js
NaN                         x 61,172,899 ops/sec ±0.74% (88 runs sampled)
string literal              x 72,032,383 ops/sec ±1.56% (87 runs sampled)
array literal               x 7,549,687 ops/sec ±0.86% (86 runs sampled)
boolean literal             x 77,500,977 ops/sec ±1.60% (88 runs sampled)
object literal              x 840,514 ops/sec ±1.36% (87 runs sampled)
object from null            x 900,767 ops/sec ±1.58% (86 runs sampled)
regex literal               x 7,366,350 ops/sec ±1.51% (83 runs sampled)
number literal              x 82,121,544 ops/sec ±1.51% (85 runs sampled)
null                        x 67,351,363 ops/sec ±1.12% (85 runs sampled)
undefined                   x 60,454,555 ops/sec ±0.85% (89 runs sampled)
date                        x 10,454,795 ops/sec ±1.22% (86 runs sampled)
map                         x 867,379 ops/sec ±2.03% (86 runs sampled)
regex constructor           x 7,904,981 ops/sec ±1.38% (85 runs sampled)
set                         x 757,486 ops/sec ±1.45% (86 runs sampled)
arguments                   x 623,163 ops/sec ±1.73% (83 runs sampled)
string literal (differing)  x 45,100,913 ops/sec ±1.03% (90 runs sampled)
array literal (differing)   x 7,140,834 ops/sec ±1.25% (86 runs sampled)
boolean literal (differing) x 36,120,625 ops/sec ±0.62% (90 runs sampled)
object literal (differing)  x 720,765 ops/sec ±1.47% (86 runs sampled)
regex literal (differing)   x 10,066,355 ops/sec ±0.90% (84 runs sampled)
null & undefined            x 47,538,484 ops/sec ±0.79% (87 runs sampled)
buffer (differing)          x 5,118,075 ops/sec ±0.55% (90 runs sampled)
date (differing)            x 10,050,854 ops/sec ±0.59% (89 runs sampled)
number (differing)          x 1,479,982 ops/sec ±1.28% (83 runs sampled)
error                       x 1,373,778 ops/sec ±1.24% (84 runs sampled)
map (differing)             x 721,806 ops/sec ±1.03% (84 runs sampled)
regex ctor (differing)      x 9,720,439 ops/sec ±2.17% (85 runs sampled)
set (differing)             x 670,433 ops/sec ±2.01% (87 runs sampled)
string ctor (differing)     x 815,542 ops/sec ±1.45% (84 runs sampled)
weakmap                     x 1,614,372 ops/sec ±1.35% (83 runs sampled)
weakset                     x 1,497,905 ops/sec ±1.75% (84 runs sampled)
arguments (differing)       x 604,466 ops/sec ±1.10% (78 runs sampled)
function                    x 5,201,240 ops/sec ±0.91% (83 runs sampled)
promise                     x 1,377,720 ops/sec ±1.91% (85 runs sampled)
arrow function (differing)  x 3,195,175 ops/sec ±0.92% (83 runs sampled)
generator func (differing)  x 2,714,716 ops/sec ±1.67% (81 runs sampled)
```
### Lodash

```js
NaN                         x 45,312,495 ops/sec ±2.19% (84 runs sampled)
string literal              x 56,845,867 ops/sec ±2.48% (85 runs sampled)
array literal               x 1,846,397 ops/sec ±2.71% (83 runs sampled)
boolean literal             x 65,536,097 ops/sec ±2.06% (85 runs sampled)
object literal              x 473,310 ops/sec ±2.08% (85 runs sampled)
object from null            x 458,069 ops/sec ±1.61% (85 runs sampled)
regex literal               x 440,908 ops/sec ±1.78% (80 runs sampled)
number literal              x 71,372,095 ops/sec ±1.64% (89 runs sampled)
null                        x 66,798,471 ops/sec ±0.97% (86 runs sampled)
undefined                   x 70,692,137 ops/sec ±1.21% (82 runs sampled)
buffer                     :
date                        x 620,836 ops/sec ±2.25% (82 runs sampled)
map                         x 168,955 ops/sec ±1.62% (85 runs sampled)
regex constructor           x 417,658 ops/sec ±1.53% (83 runs sampled)
set                         x 269,685 ops/sec ±1.25% (87 runs sampled)
string constructor          x 726,737 ops/sec ±1.74% (85 runs sampled)
arguments                   x 107,957 ops/sec ±1.35% (88 runs sampled)
string literal (differing)  x 38,465,575 ops/sec ±2.06% (86 runs sampled)
array literal (differing)   x 1,892,309 ops/sec ±2.02% (78 runs sampled)
boolean literal (differing) x 34,555,146 ops/sec ±2.74% (44 runs sampled)
object literal (differing)  x 254,560 ops/sec ±1.68% (86 runs sampled)
regex literal (differing)   x 378,713 ops/sec ±2.53% (86 runs sampled)
number literal (differing) :
null & undefined            x 45,517,618 ops/sec ±2.06% (82 runs sampled)
buffer (differing)          x 923,542 ops/sec ±1.66% (86 runs sampled)
date (differing)            x 619,294 ops/sec ±1.60% (88 runs sampled)
number (differing)            x 663,239 ops/sec ±1.96% (86 runs sampled)
error                      :
map (differing)             x 184,891 ops/sec ±2.04% (87 runs sampled)
regex ctor (differing)      x 465,092 ops/sec ±1.24% (84 runs sampled)
set (differing)             x 346,701 ops/sec ±1.61% (89 runs sampled)
string ctor (differing)    :
weakmap                     x 1,205,527 ops/sec ±1.89% (86 runs sampled)
weakset                     x 1,267,413 ops/sec ±1.20% (89 runs sampled)
arguments (differing)       x 125,527 ops/sec ±1.32% (84 runs sampled)
function                    x 1,211,485 ops/sec ±1.60% (87 runs sampled)
promise                     x 1,142,367 ops/sec ±1.39% (86 runs sampled)
arrow function (differing)  x 1,221,315 ops/sec ±1.00% (87 runs sampled)
generator func (differing)  x 1,158,629 ops/sec ±1.14% (85 runs sampled)
```