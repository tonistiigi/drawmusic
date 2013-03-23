//Array millega töötame

var startPointSet = false;
var startpoint;
var pointNumber = 0;
var lcomplete = false;
var radius = 20;
var nextPoint
var isdown
var points
var currentPoint
var correctSelection

$(document).ready(function() {
	
  $('#canvas').mousedown(function(e) {
	isdown = true;
  })
  $('#canvas').mouseup(function() {
   
	isdown = false;
	correctSelection=false
	


  })

	$("#canvas").mousemove(function(e) {
    // console.log(e)

    var parentOffset = $(this).offset(); 
	var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
	  if (!correctSelection && isdown && currentPoint){

    correctSelection = isCurrentPoint(relX, relY);
	

	}

    if (correctSelection && !lcomplete && isNextPoint(relX, relY)) {

      var outline = $('<div class="outline"></div>')

      var outlines = $('#canvas').find('#outlines')
      outlines.append(outline)

      var cur = points[pointNumber-2]
      outline.css('background-image', 'url(' + cur.src + ')')
      outline.css({left: cur.l, top: cur.t, width: cur.r, height: cur.b})

			console.log("line complete", pointNumber);
			console.log(getLayerProgress());
		}

	});

});

function setupLayer(p, src) {
  console.log('setup')
  points = p
  currentPoint = points[0]
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
	t.css("top", top-10);
	t.css("left", left-10)
	t.addClass("point")
	t.text(pointNum+1);
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
			currentPoint=points[pointNumber];
			pointNumber++;
			return true;
		} else {
			startPointSet = true;
			nextPoint = points[1];
			pointNumber=1;
			currentPoint=points[0];
		}
	}
	return false;
}

function isCurrentPoint(x,y){
	if (getDistance(currentPoint, {x : x, y : y}) < radius) {
		return true
	
	}
return false
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
