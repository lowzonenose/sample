/* global requirejs */

requirejs.config({
    "baseUrl": ".",
    "paths": {}
});

requirejs([], function () {
	console.log("init!");
});
