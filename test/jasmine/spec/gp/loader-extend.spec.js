/* global Loader, expect, GP */

/**
 * Fonctionnement de Jasmine 
 * http://jasmine.github.io/2.2/introduction.html
 * http://foodieonrails.com/2011/03/spying-with-jasmine/
 */
describe("LoaderExtend avec Namespace", function() {
    
    // var GP = {};
    // GP.Loader       = require("../../../../src/gp/loader");
    // GP.LoaderExtend = require("../../../../src/gp/loader-extend");
    
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
        loader = new GP.LoaderExtend(options);
    });

    
    it("OK : chargement des scripts", function() {

        loader.require([
            "../../samples/script-1.js",
            "../../samples/script-2.js"]);
    });
    
    it("OK : Loader options", function() {
        console.log(loader.options);
        expect(loader.options.insert).toBe(true);
        expect(loader.options.async).toBe(false);
        
    });
    
    it("OK : Loader.SETTINGS", function() {
        
        GP.Loader.SETTINGS = {
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
        
        var MyLoader = new GP.LoaderExtend();
        
        MyLoader.require([
            "../../samples/script-1.js",
            "../../samples/script-2.js"]
        );
    });
    
    
});
