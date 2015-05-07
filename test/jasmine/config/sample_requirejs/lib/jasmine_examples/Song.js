
if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(function() {
    function Song() {
    }

    Song.prototype.persistFavoriteStatus = function(value) {
      // something complicated
      throw new Error("not yet implemented");
    };

    module.exports = Song;
});

