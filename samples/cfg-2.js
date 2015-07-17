requirejs.config({
    "baseUrl": "../src/require/gp/",
    "paths": {}
});
		
requirejs(["gp", "loader"], function (GP, Loader) {
			
	var loader  = new GP.Loader();
	loader.require([
		"utils.js",
		"script-1.js",
		"script-1_1.js",
		"script-1_2.js",
		"script-1_3.js",
		"script-2.js"], 
		function(message) {
			// Callback
			console.log(message);
			var node    = document.createTextNode("Loaded !");
			var element = document.getElementById("result");
			element.appendChild(node);
	});
	
});
