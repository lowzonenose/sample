Template d'une classe

```javascript

var Template = (function () {

    "use strict";

    // constructeur
    function Template() {

        if (!(this instanceof Template)) {
            throw new TypeError("Template constructor cannot be called as a function.");
        }

        // attribut de l'instance
        this.attributs = {};
    }

    // attribut de la classe
    Template.ATTRIBUTS = {};

    // méthode static
    Template.staticMethod = function () {};

    // instance de la classe
    Template.prototype = {

        // constructeur : alias
        constructor: Template,

        // gestionnaire d'evenements
        publicOnEvent: function (evt) {},

        // méthode
        publicMethod_0: function () {
            // appel attribut public
            this.attributs.data = [];
        },

        // méthode
        publicMethod_1: function () {
            // appel méthode privée
            __privateMethod_1.call(this);
        },

        // méthode 
        publicMethod_2: function (data) {
            // appel méthode privée
            __privateMethod_2.apply(this, [data]);
        },
    };
        
    // méthodes privées
    function __privateMethod_1() {};
    function __privateMethod_2(settings) {};

}());
```