// I know these global fuctions are wrong. I know!


function setupLayer(points, endImage) {


}

function layerComplete() {

}

function layerProgress() {

}


function startGame(level) {

}

function endGame() {

}


var level = {
  name: 'twinkle',
  layers: [
    { tiles: [
      {x: 100, y: 120, src: 'tile001.png'},
      {x: 100, y: 120, src: 'tile002.png'}
      ],
      src: 'img.png',
      audio: 'audio.mp3'
    }
  ],
  duration: 12.3
}

var level = {
  name: 'twinkle',
  layers: [
    { audio: 'twinkle/twink1_drums.mp3' },
    { audio: 'twinkle/twink1_bass.mp3' },
    { audio: 'twinkle/twink1_strings.mp3' },
    { audio: 'twinkle/twink1_lead.mp3' }
  ]
}



audio.prepareAudio(level)
audio.on('loaded', function() {
  //downloaded
})


/*
var a = {}
var b = $(a)

b.one('customevent', function() {
  console.log('got custom', arguments)
})

setTimeout(function() {
  b.trigger('customevent', ['abc', 'asd'])
  b.trigger('customevent', ['abc2', 'asd'])
}, 1000)*/