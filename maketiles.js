#!/usr/bin/env node

var crop = require('./crop')
var argv = require('optimist').argv
var path = require('path')
var fs = require('fs')
var spawn = require('child_process').spawn

var file = path.resolve(argv._[0])

var json = fs.readFileSync(file)

json = JSON.parse(json)


json.layers.forEach(function(l) {
  var src = fs.readFileSync(path.join(path.dirname(file), l.src))
  l.tiles.forEach(function(t, i) {
    //console.log('l', src.length)
    //var d = crop(src, t.l, t.t, t.r, t.b)
    if (!t.r || !t.b) return
    spawn('convert', [path.join(path.dirname(file), l.src), '-crop',
    t.r + 'x' + t.b + '+' + t.l + '+' + t.t, '+repage',
    path.dirname(path.join(path.dirname(file), l.src)) + '/tile' + i + '.png'])

  })
})