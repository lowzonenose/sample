Attribut de la classe

```javascript
var Template = (function () {

    "use strict";

    // constructeur
    function Template() {}

    // attribut de la classe
    Template.ATTRIBUTS = {};

    // instance de la classe
    Template.prototype = {

        // constructeur : alias
        constructor: Template,

        // méthode
        getAttributs: function () {
            // appel attribut de la classe
            return Template.ATTRIBUTS;
        }
    };
}());
```

Appel 

```javascript
 Template.ATTRIBUTS = {
    attr1: "test",
    attr2: "test"
};

var MyTemplate = new Template();
MyTemplate.getAttributs(); // RETURN : {attr1: "test", attr2: "test"}

```

Attribut de l'instance

- public

```javascript
var Template = (function () {

    "use strict";

    // constructeur
    function Template() {
        // attribut de l'instance
        this.attributs.data = [];
    }

    // instance de la classe
    Template.prototype = {

        // constructeur : alias
        constructor: Template,

        // méthode
        getAttributs: function () {
            // appel attribut public
            return this.attributs.data;
        }
    };
}());

```

Appel
```javascript
var MyTemplate = new Template();
MyTemplate.attributs.data.push("test");
MyTemplate.getAttributs(); // RETURN : ["test"]

```

- private

TODO

```javascript
...

```
