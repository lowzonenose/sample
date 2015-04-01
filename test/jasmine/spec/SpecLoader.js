/* global Loader, expect */

/**
 * Fonctionnement de Jasmine 
 * http://jasmine.github.io/2.2/introduction.html
 * http://foodieonrails.com/2011/03/spying-with-jasmine/
 */
describe("Loader", function() {
    
    var loader;
    
    var options = {
        scope:this,
        async:false,
        onsuccess: function(message) {
            console.log("[SUCCES] " + message);
        },
        onerror: function(message) {
            console.log("[ERREUR] " + message);
        }
    };

    beforeEach(function() {
        loader = new Loader(options);
    });

    it("OK : chargement des scripts 1", function() {
        
        var myMessage = "all scipts are loaded !";
        
        loader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js"], 
        function() {
            // Callback
            console.log(myMessage);
            console.log("OK");
        });
        
    });
    
    it("OK : chargement des scripts 2", function() {

        loader.require([
            "../../samples/script-1.js",
            "../../samples/script-2.js"]);
    });
    
    it("OK : chargement des scripts avec options par defaut", function() {
        
        var MyLoader = new Loader();
        MyLoader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js"], 
        function(message) {
            // Callback
            console.log(message);
            console.log("OK");
        },
        function(message) {
            // Callback
            console.log(message);
            console.log("NOK");
        });
    });
    
    it("OK : chargement des scripts avec un probleme d'import 1", function() {
        
        loader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js",
        "../../samples/script-3.js"]);
    
    });
    
    it("OK : chargement des scripts avec un probleme d'import 2", function() {
        
        loader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js",
        "../../samples/script-3.js"],
        function(message) {
            // Callback
            console.log(message);
            console.log("OK");
        },
        function(message) {
            // Callback
            console.log(message);
            console.log("NOK");
        });
    
    });
    
    it("OK : chargement des scripts dans le tag <body>", function() {
        
        var MyLoader = new Loader({insert:false});
        MyLoader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js"], 
        function(message) {
            // Callback
            console.log(message);
            console.log("OK");
        });
    });
    
    it("OK : chargement des scripts dans le tag <head>", function() {
        
        loader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js"]);
    });
    
    it("OK : synchronisation du chargement des scripts (par defaut)", function() {
        
        loader.require([
            "../../samples/utils.js",
            "../../samples/script-1.js",
            "../../samples/script-1_1.js",
            "../../samples/script-1_2.js",
            "../../samples/script-1_3.js",
            "../../samples/script-2.js"]);
    });
    
    it("OK : synchronisation du chargement des scripts (mode asynchrone)", function() {
        
        var MyLoader = new Loader({async:true});
        
        MyLoader.require([
            "../../samples/utils.js",
            "../../samples/script-1.js",
            "../../samples/script-1_1.js",
            "../../samples/script-1_2.js",
            "../../samples/script-1_3.js",
            "../../samples/script-2.js"], 
            function(message) {
                // Callback
                console.log(message);
                console.log("OK");
            },
            function(message) {
                // Callback
                console.log(message);
                console.log("NOK");
            }
        );
    });
    
    it("OK : ordre du chargement des scripts", function() {
        // FIXME
        // le callback d'erreur n'est pas executé !
        // l'exception n'est pas interceptée...
        var MyLoader = new Loader();
        MyLoader.require([
            "../../samples/utils.js",
            "../../samples/script-1_3.js", // Exception car Classe non déclarée !
            "../../samples/script-1.js",
            "../../samples/script-1_1.js",
            "../../samples/script-1_2.js",
            "../../samples/script-2.js"], 
            function(message) {
                // Callback
                console.log(message);
                console.log("OK");
            },
            function(message) {
                // Callback
                console.log(message);
                console.log("NOK");
            }
        );
    });
    
    it("[TEST] JASMINE NOK...", function() {

        var options = {
            scope:this,
            async:false,
            onsuccess: function(message) {
                console.log("[SUCCES] " + message);
            },
            onerror: function(message) {
                console.log("[ERREUR] " + message);
            }
        };
        
        spyOn(Loader.prototype, "onLoadError");
        spyOn(Loader.prototype, "onLoadSuccess");
        spyOn(options, "onsuccess");
        spyOn(Loader.SETTINGS, "onsuccess");
        
        var myloader = new Loader(options);
        
        myloader.require([
            "../../samples/script-1.js",
            "../../samples/script-2.js"]);
        
        expect(myloader.onLoadError).not.toHaveBeenCalled();// not ???
        expect(myloader.onLoadSuccess).not.toHaveBeenCalled(); // not ???
        expect(options.onsuccess).not.toHaveBeenCalled(); // not ???
        expect(myloader.options.onsuccess).not.toHaveBeenCalledWith("[SUCCES] All Scripts Loaded!"); // not ???

    });
});
