//Array millega töötame

var level = {
  "name": "twinkle",
  "layers": [
    {
      "tiles": [
        {
          "x": 3,
          "y": 134,
          "src": "tile001.png"
        },
        {
          "x": 100,
          "y": 102,
          "src": "tile001.png"
        },
        {
          "x": 129,
          "y": 4,
          "src": "tile001.png"
        },
        {
          "x": 190,
          "y": 85,
          "src": "tile001.png"
        },
        {
          "x": 291,
          "y": 83,
          "src": "tile001.png"
        },
        {
          "x": 232,
          "y": 166,
          "src": "tile001.png"
        },
        {
          "x": 266,
          "y": 261,
          "src": "tile001.png"
        },
        {
          "x": 168,
          "y": 232,
          "src": "tile001.png"
        },
        {
          "x": 87,
          "y": 294,
          "src": "tile001.png"
        },
        {
          "x": 88,
          "y": 193,
          "src": "tile001.png"
        }
      ],
      "src": "twinkle/star.png",
      "audio": "audio.mp3"
    }
  ]
}

var points = level.layers[0].tiles;
var startPointSet = false;
var startpoint;
var pointNumber = 0;
var layerComplete = false;
var radius = 20;

$(document).ready(function() {
	var i = 0
	var x = 0
	var y = 0

	for ( ;i < points.length; i++) {
		xx = points[i].x
		yy = points[i].y

		drawPoint("",yy , xx)


	}
	nextPoint = points[0];
	$("#canvas").mousemove(function(e) {

		if (!layerComplete && isNextPoint(e.pageX, e.pageY)) {
			console.log("line complete");
			console.log(getLayerProgress());
		}

	});

});
var pointNum = 0;
function drawPoint(point, top, left) {
	var t = $('<div>')
	t.css("top", top);
	t.css("left", left)
	t.addClass("point")
	t.html(pointNum);
	pointNum++;
	$("#canvas").append(t);
}

function isNextPoint(x, y) {
	if (getDistance(nextPoint, {x : x, y : y}) < radius) {
		if (startPointSet) {
			if (points.length - 1 > pointNumber) {
				nextPoint = points[pointNumber + 1];
			} else {
				layerComplete = true;
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
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt(xs + ys);
}
