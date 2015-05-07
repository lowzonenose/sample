(function() {
  'use strict';

    // Configure RequireJS to shim Jasmine
    requirejs.config({

        baseUrl: '../../src/require',
        paths: {
            'jasmine': '../../lib/jasmine-2.2.0/jasmine',
            'jasmine-html': '../../lib/jasmine-2.2.0/jasmine-html',
            'boot': '../../lib/jasmine-2.2.0/boot'
        },

        shim: {
            'jasmine': {
                exports: 'window.jasmineRequire'
            },
            'jasmine-html': {
                deps: ['jasmine'],
                exports: 'window.jasmineRequire'
            },
            'boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'window.jasmineRequire'
          }
        }
    });

    var specs = [];
    specs.push('spec/require/loader.spec.js');
    specs.push('spec/require/loader-extend.spec.js');
    
    require(['boot'], function () {

        // Load the specs
        require(specs, function () {

            // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
            window.onload();
        });
    });
  
})();