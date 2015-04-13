/* global Loader, expect, GP, spyOn */

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

    it("OK : chargement des scripts 1", function(done) {
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
    
    it("OK : chargement des scripts 2", function() {

        loader.require([
            "../../samples/script-1.js",
            "../../samples/script-2.js"]);
    });
    
    it("OK : chargement des scripts avec options par defaut", function(done) {
        
        var MyLoader = new GP.Loader();
        MyLoader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js"], 
        function(message) {
            // Callback
            console.log(message);
            expect(message).toEqual("All Scripts Loaded!");
            done();
        });
    });
    
    it("OK : chargement des scripts avec un probleme d'import 1", function() {
        
        loader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js",
        "../../samples/script-3.js"]);
    
    });
    
    it("OK : chargement des scripts avec un probleme d'import 2", function(done) {
           
        loader.require([
        // "../../samples/script-1.js",
        // "../../samples/script-2.js",
        "../../samples/script-3.js"],
        function() {},
        function(message) {
            // Callback
            console.log(message);
            expect(message).toEqual(jasmine.stringMatching(/is not accessible/));
            done();
        });
    
    });
    
    it("OK : chargement des scripts dans le tag <body>", function(done) {
        
        var MyLoader = new GP.Loader({insert:false});
        MyLoader.require([
        "../../samples/script-1.js",
        "../../samples/script-2.js"], 
        function(message) {
            // Callback
            console.log(message);
            var scripts = document.body.getElementsByTagName("script");
            expect(scripts.length).toEqual(2);
            done();
        });
    });
    
    it("OK : chargement des scripts dans le tag <head>", function(done) {
        
        var script1 = "../../samples/script-1.js";
        var script2 = "../../samples/script-2.js";
        loader.require([ script1,script2 ],
        function(message) {
            // Callback
            console.log(message);
            var scripts = document.head.getElementsByTagName("script");
            var regex1 = new RegExp(script1);
            var regex2 = new RegExp(script2);
            var count = 0;
            for(var i=0; i<scripts.length; i++) {
                
                if(regex1.test(scripts[i].outerHTML)) {
                    count++;
                }
                
                if(regex2.test(scripts[i].outerHTML)) {
                    count++;
                }
            }
            expect(count).toBeTruthy();
            expect(count).toBeGreaterThan(1);
            done();
        });
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
    
    it("OK : synchronisation du chargement des scripts (mode asynchrone)", function(done) {
        
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
                expect(message).toEqual(jasmine.stringMatching(/Scripts Loaded/));
                done();
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
            expect(error).toBe(false);
            
        } catch (e) {
            console.log("[ERROR] " + e);
            expect(error).toBe(true);
            expect(e.message).toEqual(jasmine.stringMatching(/Loader constructor cannot be called as a function/));
        }
    });
    
    it("OK : Appel d'une méthode privée", function() {
        
        var error = true;
        try {
            var MyLoader = new GP.Loader();

            MyLoader.__importScript("../../samples/script-1.js");
    
            error = false;
            expect(error).toBe(false);
            
        } catch (e) {
            console.log("[ERROR] " + e);
            expect(error).toBe(true);
            expect(e.message).toEqual(jasmine.stringMatching(/undefined is not a function/));
        }
    });
});
