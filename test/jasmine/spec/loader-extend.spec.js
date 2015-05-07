/* global Loader, expect, GP */

/**
 * Fonctionnement de Jasmine 
 * http://jasmine.github.io/2.2/introduction.html
 * http://foodieonrails.com/2011/03/spying-with-jasmine/
 */

describe("LoaderExtend sans namespace", function() {
    
    var Loader       = require("../../../src/loader");
    var LoaderExtend = require("../../../src/loader-extend");
    
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

    
    it("OK : chargement des scripts", function() {

        try {
            loader.require([
                "../../samples/script-1.js",
                "../../samples/script-2.js"]);
        } catch(e) {
            expect(e.message).toEqual(jasmine.stringMatching(/document is not defined/));
        }
    });
    
    it("OK : Test options", function() {
        console.log(loader.options);
        expect(loader.options.insert).toBe(true);
        expect(loader.options.async).toBe(false);
        
    });
    
    it("OK : Test Loader.SETTINGS", function() {
        
        Loader.SETTINGS = {
            scope    : this,
            insert   : true,
            async    : false,
            onerror  : function (message) {
                console.log("[NOK] onerror : " + message);
            },
            onsuccess: function(message) {
                console.log("[OK] onsuccess : " + message);
            }
        };
        
        var MyLoader = new LoaderExtend();
        
        try {
            MyLoader.require([
                "../../samples/script-1.js",
                "../../samples/script-2.js"]
            );
        } catch(e) {
            expect(e.message).toEqual(jasmine.stringMatching(/document is not defined/));
        }
    });
    
    
});
