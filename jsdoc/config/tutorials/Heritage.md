
Class *TemplateExtend* extends *Template*

Méthode utilisée : Heritage par prototype

```javascript

var TemplateExtend = (function () {

    "use strict";

    function TemplateExtend() {

        if (!(this instanceof TemplateExtend)) {
            throw new TypeError("TemplateExtend constructor cannot be called as a function.");
        }

        // appel du constructeur de la classe mère avec passage de param.
        Template.call(this, arguments);

        // attribut de l'instance
        this.attributs_extends = {};
    }

    // attribut de la classe
    TemplateExtend.ATTRIBUTS_EXTENDS = {};

    // méthode static
    TemplateExtend.staticMethod = function () {};

    // héritage
    TemplateExtend.prototype = Object.create(Template.prototype);

    // surcharge car appel d'une méthode privée de la classe mère
    TemplateExtend.prototype.publicMethod_1 = function () {};
    TemplateExtend.prototype.publicMethod_2 = function () {};

    // ajout d'un nouveau comportement à la classe fille
    TemplateExtend.prototype.publicMethod_3 = function () {};

    // méthodes privées
    function __privateMethod_1() {};
    function __privateMethod_2(settings) {};

}());
```

L'heritage par prototype permet de rendre accessible les méthodes et attributs publiques de 
la classe mère. 

```javascript
var Template = (function () {

    function Template() {
        this.attributs = {}; // hérité car appel du constructeur 
    };

    // méthodes privées non héritées !
    
    // heritage du prototype
    Template.prototype = {
        constructor: Template
    };
}());

```
