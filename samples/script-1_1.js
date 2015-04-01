var Settings = (function() {
    
    function Settings () {
        console.log("call script 1-1...");
        f_message();
    };

    function f_message () {
        console.log("function of script 1-1...");
    };
    
    Settings.prototype = {
        
        m_message: function (s) {
           console.log("method of script 1-1 : " + s);
        }
        
    };
    return Settings;
}());
