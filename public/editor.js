var name
var layers

var activelayer
var activepoint

var win

function update() {
  var json = $('#raw').val().replace(/\n/g, ' ')

  json = eval('(' + json + ')')

  if (!win) {
    win = window.open()
  }

  $(win.document.body).append($('<div id="layers"></div>'))

  $(win.document.body).append($('style').clone())
  
  $(win.document.body).find('#layers').empty()

  name = json.name

  layers = json.layers.map(function(l) {

    var layer = $('<div class="layer"></div>')
    $(win.document.body).find('#layers').append(layer)

    layer.on('click', function() {
      $('.layer.active').removeClass('active')
      layer.addClass('active')
      activelayer = l
      activateLayer(l)
    })

    l.tiles.forEach(function(t, i) {
      var p = $('<div class="point">'+ (i+1) +' X: <input class="x" type="number"> Y: <input class="y"type="number"> <br>\
       L <input class="l" type="number"> T <input class="t" type="number">  W <input class="r" type="number"> H <input class="b" type="number"> \
      </div>')

      ;['x', 'y', 't', 'r', 'b', 'l'].forEach(function(c) {
        p.find('.' + c).val(t[c])
        p.find('.' + c).on('change', function(e) {
          t[c] = e.target.value
          output()
          activateLayer()
        })
        p.find('.' + c).on('keyup', function(e) {
          t[c] = e.target.value
          output()
          activateLayer()
        })

      })
      /*p.find('.y').val(t.y)
      p.find('.y').on('change', function(e) {
        t.y = e.target.value
        output()
      })


      p.find('.t').val(t.t || 0)
      p.find('.t').on('change', function(e) {
        t.t = e.target.value
        output()
      })

      p.find('.r').val(t.r || 0)
      p.find('.r').on('change', function(e) {
        t.r = e.target.value
        output()
      })

      p.find('.b').val(t.b || 0)
      p.find('.b').on('change', function(e) {
        t.b = e.target.value
        output()
      })

      p.find('.l').val(t.l || 0)
      p.find('.l').on('change', function(e) {
        t.l = e.target.value
        output()
      })
*/



      p.on('click', function() {
        $('.point.active').removeClass('active')
        p.addClass('active')
        activepoint = t
        activateLayer(activelayer)
      })


      layer.append(p)

    })

    return l
  })

  output()

}

function activateLayer(l) {
  l = activelayer
  if (!l) return;
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

    if (p == activepoint) {
      var over = $('<div class="over"></div>')
      p.l = p.l || 0
      p.t = p.t || 0
      p.r = p.r || 0
      p.b = p.b || 0
      over.css({left: p.l, top: p.t, width: p.r , height: p.b})
      points.append(over)
    }

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
