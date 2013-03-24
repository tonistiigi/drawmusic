var GameAnimations = (function() {
  function randomMove(el) {
    var pos = el.position();
    var duration = Math.floor(Math.random() * 2) + 1;
    var x = (new Date().getTime())%2 === 0 ? 1 : -1;

    el.css({
      'transition': 'all '+duration+'s ease-in-out',
      'transition-property': 'top left -webkit-transform',
      'transition-duration': duration+'s, '+duration+'s, '+duration+'s',
      '-webkit-transform-origin': '50% 50%'
    });

    el.css({
      'top': pos.top + (Math.floor(Math.random() * 20*duration) + 1),
      'left': pos.left + (Math.floor(Math.random() * 30*duration) + 1),
      '-webkit-transform': 'scale(0.90) rotate('+x*(Math.floor(Math.random() * duration*10) + 20)+'deg)'
    });

    setTimeout(function() {
      el.css({
        '-webkit-transform': 'rotate(0deg) scale(1)',
        'top': pos.top,
        'left': pos.left
      });
    }, duration*1000);

    return duration;
  }

  return {
    intervalId: null,
    start: function() {
      var callback = function() {
        $('#canvas').find('.ready img').each(function() {
          randomMove($(this));
        });
      };
      callback();
      this.intervalId = setInterval(callback, 3000);
    },

    stop: function() {
      clearInterval(this.intervalId);
    },

    play: function(timeout) {
      var me = this;
      me.start();
      setTimeout(function() {
        me.stop();
      }, timeout);
    }
  };
})();