var ResponsiveHelper = function(){
  // init variables
  var handlers = [],
    prevWinWidth,
    nativeMatchMedia = false;

  // detect match media support
  if(global.matchMedia) {
    if(global.Window && global.matchMedia === Window.prototype.matchMedia) {
      nativeMatchMedia = true;
    } else if(global.matchMedia.toString().indexOf('native') > -1) {
      nativeMatchMedia = true;
    }
  }

  // prepare resize handler
  function resizeHandler() {
    var winWidth = global.innerWidth;
    if(winWidth !== prevWinWidth) {
      prevWinWidth = winWidth;

      // loop through range groups
      handlers.forEach(function(rangeObject) {
        var rangeData = rangeObject.data;

        for (var key in rangeData) {
          var item = rangeData[key];

          // disable current active area if needed
          if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
            item.currentActive = false;
            if(typeof item.disableCallback === 'function') {
              item.disableCallback(item.rangeString);
            }
          }

          // enable areas that match current width
          if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
            item.currentActive = true;
            if(typeof item.enableCallback === 'function') {
              item.enableCallback(item.rangeString);
            }
          }
        }
      });
    }
  }

  // test range
  function matchRange(r1, r2) {
    var mediaQueryString = '';
    if(r1 > 0) {
      mediaQueryString += '(min-width: ' + r1 + 'px)';
    }
    if(r2 < Infinity) {
      mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
    }
    return matchQuery(mediaQueryString, r1, r2);
  }

  // media query function
  function matchQuery(query, r1, r2) {
    if(global.matchMedia && nativeMatchMedia && query) {
      return matchMedia(query).matches;
    } else if(global.matchMedia && nativeMatchMedia && !query) {
      return matchMedia('all').matches;
    } else if(global.styleMedia) {
      return styleMedia.matchMedium(query);
    } else if(global.media) {
      return media.matchMedium(query);
    } else {
      return prevWinWidth >= r1 && prevWinWidth <= r2;
    }
  }

  // range parser
  function parseRange(rangeStr) {
    var rangeData = rangeStr.split('..');
    var x1 = parseInt(rangeData[0], 10) || -Infinity;
    var x2 = parseInt(rangeData[1], 10) || Infinity;
    return [x1, x2].sort(function(a, b){
      return a - b;
    });
  }

  // clear resize handlers
  function clearHandlers() {
    handlers = [];
  }

  // export public functions
  this.addRange = function(ranges) {
    // parse data and add items to collection
    var result = {data:{}};

    for(var key in ranges) {
      var data = ranges[key];

      result.data[key] = {
        range: parseRange(key),
        rangeString: key,
        enableCallback: data.on,
        disableCallback: data.off
      };
    }

    handlers.push(result);

    // call resizeHandler to recalculate all events
    prevWinWidth = null;
    resizeHandler();
  };
  this.resizeHandler = resizeHandler;
  this.clearHandlers = clearHandlers;
};

module.exports = ResponsiveHelper;