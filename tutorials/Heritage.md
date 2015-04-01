Template d'une classe avec héritage

Class *TemplateExtend* extends *Template*

```javascript

var TemplateExtend = (function () {

    "use strict";

    function TemplateExtend() {

        if (!(this instanceof TemplateExtend)) {
            throw new TypeError("TemplateExtend constructor cannot be called as a function.");
        }

        // appel du constructeur de la classe mère avec passage de param.
        Template.call(this, arguments);

        this.attributs_extends = {};
    }

    TemplateExtend.ATTRIBUTS_EXTENDS = {};

    TemplateExtend.staticMethod = function () {};

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