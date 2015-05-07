/* global module */

/**
 * Description
 * 
 *  Référence sur l'implementation d'une classe en JS :
 *  cf. http://code-weblog.com/programmation-orientee-objet-en-javascript/
 *  
 * @module Loader
 */
// if (typeof define !== 'function') { var define = require('amdefine')(module) }
define( function() {
	
    // INFO
    // Forces the JavaScript engine into strict mode
    // cf. http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
    
    "use strict";
	
    /**
     * Constructeur
     * 
     * @method Loader
     * @param {Object} options
     * @param {String} options.scope
     * @param {String} options.onsuccess - function callback success
     * @param {String} options.onerror - function callback error
     * @param {String} options.insert - before or head (true)/after or body (false)
     * @param {String} options.async - true/false
     */
    function Loader(options) {
        
        if (!(this instanceof Loader)) {
            throw new TypeError("Loader constructor cannot be called as a function.");
        }
        
        /**
         * Attributs d'instance 
         * (définis dans le constructeur)
         */
        this.options = options || __getDefaultOptions();
        
        if (this.options == null) {
            throw new Error("options undefined ?!");
        }
        
        // INFO
        // par defaut, on met toujours des callback...
        if (this.options.onsuccess == null) {
            /**
             * Description
             * @method onsuccess
             * @param {String} message
             * @private
             */
            this.options.onsuccess = function(message) {
                console.log("[CALLBACK] onsuccess : " + message);
            };
        }
        if (this.options.onerror == null) {
            /**
             * Description
             * @method onerror
             * @param {String} message
             * @private
             */
            this.options.onerror = function(message) {
                console.log("[CALLBACK] onerror : " + message);
            };
        }
        
        // INFO
        // par defaut, le scope du callback = classe...
        if (this.options.scope == null) {
            this.options.scope = this;
        }
        
        // INFO
        // par defaut, on insert les scripts à la fin dans le tag <head>
        if (this.options.insert == null) {
            this.options.insert = true;
        }
        
        // INFO
        // par defaut,  not asynchronously loaded scripts
        if (this.options.async == null) {
            this.options.async = false;
        }
    };
    
    /**
     * Attributs de classe
     * 
     * @static
     * @example 
     *      console.log(Loader.SETTINGS);
     */
    Loader.SETTINGS = {
        scope    : this,
        insert   : true,
        async    : false,
        onerror  : function (message) {
            console.log("[CALLBACK] onerror : " + message);
        },
        onsuccess: function(message) {
            console.log("[CALLBACK] onsuccess : " + message);
        }
    };

    /**
     * Méthodes de classe
     * 
     * @function getLocalOptions
     * @static
     * @return {Loader.SETTINGS} Settings par defaut
     * @example 
     *      console.log(Loader.getLocalOptions());
     */
    Loader.getLocalOptions = function () {

        // INFO 
        // Note that 'this' does not refer to the Loader object from inside this method.

        return Loader.SETTINGS;

    };
    
    /**
     * Méthodes de classe (private)
     * 
     * @function _getDefaultOptions
     * @return {Loader.SETTINGS} Settings par defaut
     * @example 
     *      // appel dans la classe ou l'instance
     *      __getDefaultOptions.call(this);
     */
    function __getDefaultOptions () {
        
        // INFO 
        // fonction privée utilisable uniquement au sein de la classe ou dans une instance !
        // Par contre, on n'a pas d'utilisation du mot clé 'this' 
        // sauf si on passe par l'appel via 'call' ou 'apply'.
        
        return Loader.SETTINGS;
    };
    
    
    // INFO
    // All methods added to a Class' prototype are public (visible); they are able to 
    // access the properties and methods of the Loader class via the `this` keyword.
    
    Loader.prototype = {

        // INFO
    	// Whenever you replace an Object's Prototype, you need to repoint
    	// the base Constructor back at the original constructor Function, 
    	// otherwise `instanceof` calls will fail.
    	
    	/**
    	 * Constructeur
    	 * @constructor
         * @alias Loader
    	 */
        constructor: Loader,

        /**
         * Méthodes d'instance
         * @method require
         * @param {Array}  scripts
         * @param {Function} callback_success
         * @param {Function} callback_error
         */
        require: function (scripts, callback_success, callback_error) {
            
            // INFO
            // ces variables de l'instances sont publiques.
            this.loadCount      = 0;
            this.totalRequired  = scripts.length;

            // INFO
            // on surcharge les callback par defaut
            if (callback_success != null && typeof callback_success == 'function') {
                this.options.onsuccess = callback_success;
            }
            
            if (callback_error != null && typeof callback_error == 'function') {
                this.options.onerror = callback_error;
            }

            for (var i = 0; i < scripts.length; i++) {
                // INFO
                // appel de la méthode privée avec passage de param.
                __importScript.apply(this, [scripts[i]]);
            }
        },

        /**
         * Méthodes d'instance
         * Callback d'import de tous les scripts
         * @method onLoaded
         * @param {Object} evt
         */
        onLoaded: function (evt) {
            this.loadCount++;

            if (this.loadCount == this.totalRequired) {
                var message = "All Scripts Loaded!";
                this.options.onsuccess.call(this.options.scope, message);
            }
        },
        
        /**
         * Méthodes d'instance
         * Callback d'erreur de chargement d'un script
         * @method onLoadError
         * @param {Object} error
         */
        onLoadError: function (error) {
            // FIXME nettoyage à faire !
            var message = "The script " + error.target.src + " is not accessible.";
            this.options.onerror.call(this.options.scope, message);
        },

        /**
         * Méthodes d'instance
         * Callback du succes du chargement d'un script
         * @method onLoadSuccess
         * @param {Object} evt
         * @param {String} url
         */
        onLoadSuccess: function (evt, url) {
            console.log("loading script : " + url);
        }
    };

    // INFO
    // Méthodes privées
    // Elles sont appelées par des méthodes publiques de l'instance 
    // Ex. 
    //      var scripts = [];
    //      __importScript.apply(this, scripts);
    // 
    // Référence sur l'implementation 'private or static method' : 
    // cf. http://philipwalton.com/articles/implementing-private-and-protected-members-in-javascript/
    
    /**
     * Méthodes d'instance
     * 
     * Import d'un script 
     * @method __importScript
     * @param {String} src
     */
    function __importScript (src) {
            
        var self = this;

        var oScript = document.createElement('script');
        oScript.type = "text/javascript";
        // FIXME async or defer !?
        oScript.async = this.options.async;
        oScript.src = src;

        /**
         * Méthodes d'instance
         * Erreur de chargement d'un script
         * @method onerror
         * @param {Object} error
         * @private
         */
        oScript.onerror = function (error) { 
            self.onLoadError(error);
        };

        /**
         * Méthodes d'instance
         * Succes du chargement d'un script
         * @method onload
         * @param {Object} event
         * @private
         */
        oScript.onload = function (event) { 
            self.onLoadSuccess(event, src);
        };

        oScript.addEventListener('load', function (e) { self.onLoaded(e); }, false);

        if (this.options.insert) {
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(oScript);
        }
        else {
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(oScript);
        }
    };
    
    // module.exports = Loader;
    return Loader;
    
});

