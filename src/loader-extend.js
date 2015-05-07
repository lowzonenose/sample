/* global module */

/**
 * Description
 * 
 * @namespace GP
 * @module LoaderExtend
 * @extends Loader
 */

LoaderExtend = (function () {
    
    "use strict";
    
    /**
     * Constructeur
     * 
     * @method LoaderExtend
     * @see Loader
     */
    function LoaderExtend () {
        
        if (!(this instanceof LoaderExtend)) {
            throw new TypeError("LoaderExtend constructor cannot be called as a function.");
        }
        
        // INFO
        // appel du constructeur de la classe mère
        // avec passage de param.
        Loader.apply(this, arguments);
        
        // INFO
        // autre manière d'appeller le constructeur :
        //      this.base = Loader;
        //      this.base(arguments);
        
        // INFO
        // on surcharge la valeur
        this.options.insert = true;
    };
    
    /**
     * heritage des comportements de la classe mère
     */
    LoaderExtend.prototype = Object.create(Loader.prototype);
    
    /**
     * surcharge d'un comportement de la classe mère
     * 
     * @method require
     * @param {Array}  scripts
     * @param {Function} callback_success
     * @param {Function} callback_error
     */
    LoaderExtend.prototype.require = function (scripts, callback_success, callback_error) {
            
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
            this.importScript(scripts[i]);
        }
    };
    
    /**
     * ajout d'un comportement spécifique à la classe fille
     * 
     * @method importScript
     * @param {type} src
     */
    LoaderExtend.prototype.importScript = function (src) {
            
        var self = this;

        var oScript  = document.createElement('script');
        oScript.type = "text/javascript";
        oScript.src  = src;

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

        var head = document.getElementsByTagName('head')[0];
            head.appendChild(oScript);
        
    };
    
    return LoaderExtend;
}());

module.exports = LoaderExtend;