var EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t; },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t; },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t); },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t; },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1; },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t; },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t; },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t; },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t; },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
};
var _ = require('lodash');
var INTERVAL = 10;

function move(steps, next, done){
  next(steps.shift());
	if(steps.length){
    setTimeout(_.partial(move, steps, next, done), INTERVAL);
	}else{
    done();
  }
}

module.exports = {
	scrollToTop: function(options){
    return new Promise(function(resolve, reject){
      var windowScrollSupport = _.isFunction(window.scroll),
          start,
          end,
          distance,
          steps,
          stepCount;

      // no animation for browsers that don't support window scroll
      if(!windowScrollSupport){
        resolve();
        return;
      }

      start = window.scrollY;
      end = 0;
      distance = end - start;

      // nothing to animate
      if(distance === 0){
        resolve();
        return;
      }

      // default options
      options = options || {};
      options.duration = _.isNumber(options.duration) ? options.duration : 500;
      options.easing = options.easing || 'easeInOutCubic';

      stepCount = Math.round(options.duration / INTERVAL);
      steps = _.times(stepCount, function(i){
        var percentComplete = i ? i / (stepCount - 1) : 0;
        return EasingFunctions[options.easing](percentComplete);
      });

      move(steps, function(ease){
        window.scroll(0, start + (distance * ease));
      }, resolve);

    });
	}
};