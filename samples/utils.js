var Utils = {
    sleep : function (milliseconds) {
        console.log("sleep...");
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    },
    
    extend: function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
          if (!arguments[i])
            continue;

          for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
              out[key] = arguments[i][key];
          }
        }

        return out;
      }
};
