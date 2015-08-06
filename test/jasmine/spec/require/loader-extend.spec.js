/* global Loader, expect, GP */

/**
 * Fonctionnement de Jasmine 
 * http://jasmine.github.io/2.2/introduction.html
 * http://foodieonrails.com/2011/03/spying-with-jasmine/
 */

define(["loader-extend"], function (LoaderExtend) {
    
    'use strict';
    
    describe("LoaderExtend RequireJS", function() {

        var loader;

        var options = {
            scope:this,
            async:false,
            onsuccess: function(message) {
                console.log("[MYSUCCES] " + message);
            },
            onerror: function(message) {
                console.log("[MYERREUR] " + message);
            }
        };

        beforeEach(function() {
            loader = new LoaderExtend(options);
        });


        it("OK : chargement des scripts", function(done) {

            var myMessage = "loading script";
            loader.require([
                "../../samples/script-1.js",
                "../../samples/script-2.js"], 
            function(message) {
                // Callback
                console.log(message);
                expect(myMessage).toEqual(jasmine.stringMatching(/loading script/));
                done();
            });
        });

    });
});