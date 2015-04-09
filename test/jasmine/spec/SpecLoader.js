/* global Loader, expect, GP */

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
            console.log("[MYSUCCES] " + message);
        },
        onerror: function(message) {
            console.log("[MYERREUR] " + message);
        }
    };

    beforeEach(function() {
        loader = new GP.Loader(options);
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
        
        var MyLoader = new GP.Loader();
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
        
        var MyLoader = new GP.Loader({insert:false});
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
        
        var MyLoader = new GP.Loader({async:true});
        
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
        var MyLoader = new GP.Loader();
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
        
        var MyLoader = new GP.Loader();

        MyLoader.require([
            "../../samples/script-1.js",
            "../../samples/script-2.js"]
        );
    });
    
    it("OK : Appel Loader sans le mot clef 'new'", function() {
        
        var error = true;
        try {
            var MyLoader = GP.Loader();

            MyLoader.require([
                "../../samples/script-1.js",
                "../../samples/script-2.js"]
            );
    
            error = false;
            
        } catch (e) {
            console.log("[ERROR] " + e);
            expect(error).toBe(true);
        }
    });
    
    it("OK : Appel d'une méthode privée", function() {
        
        var error = true;
        try {
            var MyLoader = new GP.Loader();

            MyLoader.__importScript("../../samples/script-1.js");
    
            error = false;
            
        } catch (e) {
            console.log("[ERROR] " + e);
            expect(error).toBe(true);
        }
    });
    
    // TEST à la con ...
    it("[TEST] JASMINE NOK...", function() {

        var observer = {callback: function(){}};
            
        var options = {
            scope:this,
            async:false,
            onsuccess: function (message) {
                console.log("[SUCCES] " + message);
            },
            onerror: function(message) {
                console.log("[ERREUR] " + message);
            }
        };
        
        spyOn(observer, "callback");
        
        var myloader = new GP.Loader(options);
        
            myloader.require([
                "../../samples/script-1.js",
                "../../samples/script-2.js"],
            function(){
                observer.callback();
            });
        
        expect(options.callback).toHaveBeenCalled();
                // .toHaveBeenCalledWith(jasmine.stringMatching("[SUCCES]"));
        
        
        
    });
    it("[TEST] JASMINE SAMPLE...", function() {

        var callback = jasmine.createSpy('callback');
        
        callback('foobarbaz');

        expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'));
        expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
    });
   
});
