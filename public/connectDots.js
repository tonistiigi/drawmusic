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

	$("#canvas").mousemove(function(e) {
    // console.log(e)
    if (isdown && !lcomplete && isNextPoint(e.offsetX, e.offsetY)) {
			console.log("line complete");
			console.log(getLayerProgress());
		}

	});

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
	$("#canvas").append(t);
}

function isNextPoint(x, y) {
  // console.log(nextPoint, x, y, radius, getDistance(nextPoint, {x : x, y : y}));
	if (getDistance(nextPoint, {x : x, y : y}) < radius) {

		if (startPointSet) {
			if (points.length - 1 > pointNumber) {
				nextPoint = points[pointNumber + 1];
			} else {
				lcomplete = true;
				layerComplete();
				console.log("picture is complete");
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
