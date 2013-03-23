
var lastTouch = null;

function initCanvas() {
  var canvas = $('#canvasid');
  var offset = canvas.offset();
  var context = canvas.get(0).getContext('2d');

  context.strokeStyle = '#000000';
  context.lineWidth = 4;
  context.lineCap = 'square';

  var isdown = 0;

  $('#canvas').on('touchstart mousedown', function(e){
    lastTouch = {
      x: e.originalEvent.pageX - offset.left,
        y: e.originalEvent.pageY - offset.top
    };
  });

  $('#canvas').on('touchend mouseup', function(e) {
    lastTouch = null;
    // Store the current transformation matrix
    context.save();
    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width(), canvas.height());
    // Restore the transform
    context.restore();
  });

  $('#canvas').on('touchmove mousemove', function(e) {
    if (lastTouch) {
      context.beginPath();
      context.moveTo(lastTouch.x, lastTouch.y);
      context.lineTo(e.originalEvent.pageX - offset.left, e.originalEvent.pageY - offset.top);
      context.stroke();

      lastTouch = {
        x: e.originalEvent.pageX - offset.left,
        y: e.originalEvent.pageY - offset.top
      };
      e.preventDefault();
      return false;
    }
    else if (lastTouch === 0) {
      lastTouch = {
        x: e.originalEvent.pageX - offset.left,
          y: e.originalEvent.pageY - offset.top
      };
    }

  });

}

function clearCanvas() {
  var canvas = $('#canvasid');
  var context = canvas.get(0).getContext('2d');
  context.clearRect(0, 0, canvas.width(), canvas.height());
  lastTouch = null
  setTimeout(function() {
    lastTouch = 0;
  }, 500)
}
