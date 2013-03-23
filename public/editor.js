var name
var layers

var activelayer
var activepoint

function update() {
  var json = $('#raw').val().replace(/\n/g, ' ')

  json = eval('(' + json + ')')

  $('#layers').empty()

  name = json.name

  layers = json.layers.map(function(l) {

    var layer = $('<div class="layer"></div>')
    $('#layers').append(layer)

    layer.on('click', function() {
      $('layer.active').removeClass('active')
      layer.addClass('active')
      activelayer = l
      activateLayer(l)
    })

    l.tiles.forEach(function(t, i) {
      var p = $('<div class="point">'+ (i+1) +' X: <input class="x"> Y: <input class="y"></div>')
      p.find('.x').val(t.x)
      p.find('.x').on('change', function(e) {
        t.x = e.target.value
        output()
      })
      p.find('.y').val(t.y)
      p.find('.y').on('change', function(e) {
        t.y = e.target.value
        output()
      })


      p.on('click', function() {
        $('.point.active').removeClass('active')
        p.addClass('active')
        activepoint = t
      })


      layer.append(p)

    })

    return l
  })

  output()

}

function activateLayer(l) {
  $('#board').empty();

  var layer = $('<div id="al"></div>')
  console.log(l)
  var img = $('<img src="' + l.src + '">')
  layer.append(img)

  var points = $('<div class="aps"><div>')

  l.tiles.forEach(function(p, i) {
    var ap = $('<div class="ap">' + (i+1) + '</div>')
    ap.css({left: p.x, top: p.y})
    points.append(ap)
  })
    layer.append(points)
  $('#board').append(layer)
}

function output() {
  var json = {}
  json.name = name
  json.layers = layers
  $('#raw').val(JSON.stringify(json, false, 2))
}

$(function() {

$('#board').on('click', function(e) {
  console.log(e, activepoint)
  if (!activepoint) return;
  activepoint.x = e.clientX
  activepoint.y = e.clientY
  output()
  activateLayer(activelayer)
})


})
