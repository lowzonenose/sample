Template d'une classe

```javascript

var Template = (function () {

    "use strict";

    function Template() {

        if (!(this instanceof Template)) {
            throw new TypeError("Template constructor cannot be called as a function.");
        }

        this.attributs = {};
    }

    Template.ATTRIBUTS = {};

    Template.staticMethod = function () {};

    Template.prototype = {

        constructor: Template,

        publicOnEvent: function (evt) {},

        publicMethod_0: function () {
            this.attributs.data = [];
        },

        publicMethod_1: function () {
            __privateMethod_1.call(this);
        },

        publicMethod_2: function (data) {
            __privateMethod_2.apply(this, [data]);
        },
    };

    function __privateMethod_1() {};
    function __privateMethod_2(settings) {};

}());
```