// karma.conf.js
module.exports = function(config) {
  config.set({
    files: [
      '../../src/gp/*.js',
      '../../test/jasmine/spec/*.js'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      '../../src/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : '../build/'
    }
  });
};