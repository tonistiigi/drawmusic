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
      activelayer = layer
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
        activepoint = p
      })


      layer.append(p)

    })

    return l
  })

  output()

}

function output() {
  var json = {}
  json.name = name
  json.layers = layers
  $('#raw').val(JSON.stringify(json, false, 2))
}
