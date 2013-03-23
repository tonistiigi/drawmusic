//Array millega töötame

var startPointSet = false;
var startpoint;
var pointNumber = 0;
var lcomplete = false;
var radius = 20;
var nextPoint
var isdown
var points

$(document).ready(function() {

  $('#canvas').mousedown(function() {
    isdown = true
  })
  $('#canvas').mouseup(function() {
    isdown = false
  })

  $('#canvas').on('touchstart', function() {
    isdown = true

    console.log('m11')
  })
  $('#canvas').on('touchend touchcancel', function() {
    isdown = true
  })

  var onmove = function(e) {
    var offset = $('#canvas').offset()
    // console.log('mm', offset, e.originalEvent.pageX - offset.left, e.originalEvent.pageY - offset.top)


    if (isdown && !lcomplete && isNextPoint(e.originalEvent.pageX - offset.left, e.originalEvent.pageY - offset.top)) {

      var outline = $('<div class="outline"></div>')

      var outlines = $('#canvas').find('#outlines')
      outlines.append(outline)

      var cur = points[pointNumber-2]
      outline.css('background-image', 'url(' + cur.src + ')')
      outline.css({left: cur.l, top: cur.t, width: cur.r, height: cur.b})

			console.log("line complete", pointNumber);
      clearCanvas();
			audio.setProgress(getLayerProgress());
		}

	};


	$("#canvas").mousemove(onmove);
	$("#canvas").on('touchmove', onmove);

});

function setupLayer(p, src) {
  console.log('setup')
  points = p
  for (var i = 0 ;i < p.length; i++) {
		var xx = p[i].x
		var yy = p[i].y

		drawPoint(yy , xx)
	}
  nextPoint = p[0];
}

var pointNum = 0;
function drawPoint(top, left) {
	var t = $('<div>')
	t.css("top", top);
	t.css("left", left)
	t.addClass("point")
	t.html(pointNum);
	pointNum++;
	$("#canvas .points").append(t);
}

function isNextPoint(x, y) {
  // console.log(nextPoint, x, y, radius, getDistance(nextPoint, {x : x, y : y}));
	if (getDistance(nextPoint, {x : x, y : y}) < radius) {

		if (startPointSet) {
			if (points.length  > pointNumber) {
				nextPoint = points[pointNumber + 1];
        if (!nextPoint) nextPoint = points[0]
			} else {
				lcomplete = true;
				layerComplete();
				console.log("picture is complete");
        clearCanvas();
			}
			pointNumber++;
			return true;
		} else {
			startPointSet = true;
			nextPoint = points[1];
			pointNumber = 1;
		}
	}
	return false;
}

function getLayerProgress() {
	return (pointNumber/points.length)*100;
}
function getDistance(point1, point2) {
  // console.log({p:point1, p2:point2})
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt(xs + ys);
}
