Methodes

* private

```javascript
var Template = (function () {

    "use strict";

    // constructeur
    function Template() {
        this.attributs.data = [];
    }

    // instance de la classe
    Template.prototype = {

        // constructeur : alias
        constructor: Template,

        // méthode publique
        publicMethod: function () {
            // appel méthode privée
            __privateMethod.call(this);
        },

        publicMethod_failed1: function () {
            // FIXME on ne peut pas appeler une méthode privée ainsi
            // avec le contexte 'this' car cette fonction n'appartient pas à l'instance.
            this.__privateMethod();
        },

        publicMethod_failed2: function () {
            // FIXME on peut appeler une méthode privée ainsi
            // mais le contexte 'this' n'est pas envoyé à l'instance de la classe
            // donc échec lors de l'appel à "this.attributs.data.push("test")"
            __privateMethod();
        },
    };
        
    // méthode privée
    function __privateMethod() {
        this.attributs.data.push("test");
    };

}());

// appel
var myTemplate = new Template();
myTemplate.__privateMethod(); // --> FAILED !
myTemplate.publicMethod();    // --> OK, appel via une méthode publique...
```

* public

```javascript
var Template = (function () {

    "use strict";

    // constructeur
    function Template() {
        this.attributs.data = [];
    };

    // instance de la classe
    Template.prototype = {

        // constructeur : alias
        constructor: Template,

        // méthode
        publicMethod: function () {
            // appel d'un attribut public
            this.attributs.data.push("test");
        },
    };

}());

// appel
var myTemplate = new Template();
myTemplate.publicMethod();
```

* static

```javascript
var Template = (function () {

    "use strict";

    // constructeur
    function Template() {};

    // méthode static
    Template.staticMethod = function () {};
}());

// appel
Template.staticMethod();
```
 