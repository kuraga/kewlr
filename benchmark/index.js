const chai = require('./others/chai.js');
const kewlr = require('../dist/kewlr.js').strict;
const lodash = require('lodash');
const underscore = require('underscore');
const nodeDeepEqual = require('deep-equal');
const nshallow = require('not-so-shallow');
const Benchmark = require('benchmark');
const Immutable = require('immutable');

function newSuite (name) {
  return new Benchmark.Suite(name, {
    onStart: () => console.log(`\n\n${name}`),
    onCycle: event => console.log(String(event.target)),
    onComplete: function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    }
  });
}

 newSuite('Basic primitive test')
.add('lodash', () => lodash.isEqual(1, '1'))
.add('underscore', () => underscore.isEqual(1, '1'))
.add('kewlr', () => kewlr(1, '1'))
.add('chai', () => chai(1, '1'))
.run({ async: false });

 newSuite('String literal')
.add('lodash', () => lodash.isEqual([ 'abc', 'abc' ]))
.add('underscore', () => underscore.isEqual([ 'abc', 'abc' ]))
.add('kewlr', () => kewlr([ 'abc', 'abc' ]))
.add('chai', () => chai([ 'abc', 'abc' ]))
.run({ async: false });

 newSuite('Boolean literal')
.add('lodash', () => lodash.isEqual(true, true))
.add('underscore', () => underscore.isEqual(true, true))
.add('kewlr', () => kewlr(true, true))
.add('chai', () => chai(true, true))
.run({ async: false });

 newSuite('Basic primitive test')
.add('lodash', () => lodash.isEqual(1, '1'))
.add('underscore', () => underscore.isEqual(1, '1'))
.add('kewlr', () => kewlr(1, '1'))
.add('chai', () => chai(1, '1'))
.run({ async: false });

 newSuite('Object created from null')
.add('lodash', () => lodash.isEqual(Object.create(null), Object.create(null)))
.add('underscore', () => underscore.isEqual(Object.create(null), Object.create(null)))
.add('kewlr', () => kewlr(Object.create(null), Object.create(null)))
.add('chai', () => chai(Object.create(null), Object.create(null)))
.run({ async: false });


newSuite('Object literal')
.add('lodash', () => lodash.isEqual( {a: 1, b:2} , {b: 2, a:1}))
.add('underscore', () => underscore.isEqual(1, '1'))
.add('kewlr', () => kewlr(  {a: 1, b:2} , {b: 2, a:1}))
.add('chai', () => chai({a: 1, b:2} , {b: 2, a:1} ))
.run({ async: false });

newSuite('Array vs Object literal')
.add('lodash', () => lodash.isEqual( [], {}))
.add('underscore', () => underscore.isEqual(1, '1'))
.add('kewlr', () => kewlr(  [], {}))
.add('chai', () => chai([], {}))
.add('Immutable.is', () => Immutable.is(1, '1'))
.run({ async: false });

newSuite('Undefined')
.add('lodash', () => lodash.isEqual(undefined, undefined))
.add('underscore', () => underscore.isEqual(undefined, undefined))
.add('kewlr', () => kewlr(undefined, undefined))
.add('chai', () => chai(undefined, undefined))
.add('Immutable.is', () => Immutable.is(undefined, undefined))
.run({ async: false });

newSuite('Date')
.add('lodash', () => lodash.isEqual( new Date(123), new Date(123)))
.add('underscore', () => underscore.isEqual(new Date(123), new Date(123)))
.add('kewlr', () => kewlr(new Date(123), new Date(123)))
.add('chai', () => chai(new Date(123), new Date(123)))
.add('Immutable.is', () => Immutable.is(new Date(123), new Date(123)))
.run({ async: false });

newSuite('String ctor')
.add('lodash', () => lodash.isEqual( new String(), new String()))
.add('underscore', () => underscore.isEqual(new String(), new String()))
.add('kewlr', () => kewlr(new String(), new String()))
.add('chai', () => chai(new String(), new String()))
.run({ async: false });

newSuite('Error')
.add('lodash', () => lodash.isEqual( new Error(''), new Error('')))
.add('underscore', () => underscore.isEqual(new Error(''), new Error('')))
.add('kewlr', () => kewlr(new Error(''), new Error('')))
.add('chai', () => chai(new Error(''), new Error('')))
.add('Immutable.is', () => Immutable.is(new Error(''), new Error('')))
.run({ async: false });

newSuite('Map()')
.add('lodash', () => lodash.isEqual( new Map().set('a', 1), new Map().set('a', 2)))
.add('kewlr', () => kewlr(new Map().set('a', 1), new Map().set('a', 2)))
.add('chai', () => chai(new Map().set('a', 1), new Map().set('a', 2)))
.run({ async: false });

newSuite('Set()')
.add('lodash', () => lodash.isEqual( new Set().add(1), new Set().add(2)))
.add('kewlr', () => kewlr(new Set().add(1), new Set().add(2)))
.add('chai', () => chai(new Set().add(1), new Set().add(2)))
.run({ async: false });

newSuite('Function')
.add('lodash', () => lodash.isEqual(function () {}, function () {}))
.add('underscore', () => underscore.isEqual(function () {}, function () {}))
.add('kewlr', () => kewlr(function () {}, function () {}))
.add('chai', () => chai(function () {}, function () {}))
.run({ async: false });

newSuite('Null & undefined')
.add('lodash', () => lodash.isEqual(new Number(123), new Number(456)))
.add('underscore', () => underscore.isEqual(new Number(123), new Number(456)))
.add('kewlr', () => kewlr(new Number(123), new Number(456)))
.add('chai', () => chai(new Number(123), new Number(456)))
.add('Immutable.is', () => Immutable.is(new Number(123), new Number(456)))
.add('node-deep-equal', () => nodeDeepEqual(new Number(123), new Number(456)))
.run({ async: false });

newSuite('Numbers')
.add('lodash', () => lodash.isEqual(null, undefined))
.add('underscore', () => underscore.isEqual(null, undefined))
.add('kewlr', () => kewlr(null, undefined))
.add('chai', () => chai(null, undefined))
.add('Immutable.is', () => Immutable.is(null, undefined))
.add('node-deep-equal', () => nodeDeepEqual(null, undefined))
.run({ async: false });

const empty = newSuite('Empty Object Test');
const emptyA = new require('./data/empty');
const emptyB = new require('./data/empty');
const iEmptyA = Immutable.Map(require('./data/empty'));
const iEmptyB = Immutable.Map(require('./data/empty'));

empty.add('lodash', () => lodash.isEqual(emptyA, emptyB));
empty.add('kewlr', () => kewlr(emptyA, emptyB));
empty.add('chai', () => chai(emptyA, emptyB));
empty.add('underscore', () => underscore.isEqual(emptyA, emptyB));
empty.add('node-deep-equal', () => nodeDeepEqual(emptyA, emptyB));
empty.run({ async: false });

const small = newSuite('Small Object Test');
const smallA = new require('./data/small');
const smallB = new require('./data/small');
small.add('lodash', () => lodash.isEqual(smallA, smallB));
small.add('kewlr', () => kewlr(smallA, smallB));
small.add('chai', () => chai(smallA, smallB));
small.add('underscore', () => underscore.isEqual(smallA, smallB));
small.add('Immutable.is', () => Immutable.is(smallA, smallB));
small.add('node-deep-equal', () => nodeDeepEqual(smallA, smallB));

const medium = newSuite('Medium Object Test');
const mediumA = new require('./data/medium');
const mediumB = new require('./data/medium');
const iMediumA = Immutable.Map(require('./data/medium'));
const iMediumB = Immutable.Map(require('./data/medium'));

medium.add('lodash', () => lodash.isEqual(mediumA, mediumA));
medium.add('kewlr', () => kewlr(mediumA, mediumA));
medium.add('underscore', () => underscore.isEqual(mediumA, mediumB));
medium.add('chai', () => chai(mediumA, mediumB));
medium.add('node-deep-equal', () => nodeDeepEqual(mediumA, mediumB));
medium.add('Immutable.is', () => Immutable.is(iMediumA, iMediumB));
medium.run({ async: false });

const large = newSuite('Large Object Test');
const largeA = new require('./data/large');
const largeB = new require('./data/large');
const iLargeA = Immutable.Map(require('./data/large'));
const iLargeB = Immutable.Map(require('./data/large'));

large.add('lodash', () => lodash.isEqual(largeA, largeB));
large.add('kewlr', () => kewlr(largeA, largeB));
large.add('underscore', () => underscore.isEqual(largeA, largeB));
large.add('chai', () => chai(largeA, largeB));
large.add('node-deep-equal', () => nodeDeepEqual(largeA, largeB));
large.add('Immutable.is', () => Immutable.is(iLargeA, iLargeB));
large.run({ async: false });
