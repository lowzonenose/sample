/**
 * Description
 * 
 *  <Namespace> Global 
 * 
 *  The following options *do* check for variable/namespace existence.
 *  If already defined, we use that instance, otherwise we assign a new
 *  object literal to myApplication.
 * 
 *  - Option 1: var GP = GP || {};
 *  - Option 2  if(!GP) GP = {};
 *  - Option 3: var GP = GP = GP || {}
 *  - Option 4: GP || (GP = {});
 *  - Option 5: var GP = GP === undefined ? {} : GP;
 * 
 * @namespace GP
 */
 
define(['loader', 'loader-extend'], function(Loader, LoaderExtend){
	
  var GP = window.GP || {
        'version': '1.0.0',
        'date': '2015',
        'extend': function (ns_string, value) {
                var parts = ns_string.split("."),
                    parent = this,
                    pl;

                pl = parts.length;

                for ( var i = 0; i < pl; i++ ) {
                    // create a property if it doesn't exist
                    if ( typeof parent[parts[i]] === "undefined" ) {
                        parent[parts[i]] = {};
                    }

                    if(i === (pl-1)) {
                       parent[parts[i]] = value;
                    }

                    parent = parent[parts[i]];
                }

                return this;
            }
        };

        // on declare les ns dan root global
        GP.extend('Loader', Loader);
        GP.extend('LoaderExtend', LoaderExtend);
        
        // root global !
        if (!window.GP) {
            window.GP = GP;
        }

        return window.GP;
});
