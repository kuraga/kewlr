#!/bin/sh

set -e

# Transpile TypeScript for the unit tests
npm run pretest
# Run browser tests
# npm run test:browser
# Gathering coverage report
npm run test