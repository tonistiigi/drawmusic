var audio = $({})

var AudioContext = window.AudioContext || window.webkitAudioContext
var buffers = []

audio.prepareAudio = function (level) {
  audio.context = new AudioContext
  audio.gain = context.createGainNode()
  audio.gain.connect(audio.context.destination)
  audio.loaded = 0
  level.layers.map(function(layer, i) {
    return loadBuffer(layer, i)
  })

  audio.on('loaded', function() {
    if (audio.nextTrack) audio.loadTrack(audio.nextTrack)
    audio.nextTrack = 0
    audio.play()
  })

}

audio.startLayer = function(index) {
  audio.vol = 0
  if (buffers[index]) {
    audio.loadTrack(index)
  }
  else {
    audio.nextTrack = index
  }
}

audio.play = function() {

}

audio.pause = function() {

}

audio.loadTrack = function(index) {
  var b = buffers[index]
  b.source = audio.context.createBufferSource()
  b.source.buffer = b.buffer
  b.gain = audio.context.createGainNode()
  b.gain.connect(audio.gain)
  b.gain.gain.value = 0
  b.source.connect(b.gain)
  audio.active = index
  b.source.noteOn(0)

  setTimeout(function() {
    onEnded()
  }. b.buffer.duration * 1e3 - 150)
}

function onEnded() {
  
}

audio.setProgress = function(val) {
  buffers[audio.active].gain.gain.value = val / 100
}

audio.setComplete = function() {
  buffers[audio.active].gain.gain.value = 1
}



function loadBuffer(layer, i) {
  buffers[i] = null
  var req = new XMLHttpRequest();
  req.open('GET', path, true);
  req.responseType = 'arraybuffer';
  req.onload = function() {
      context.decodeAudioData(req.response, function(buffer) {
         if (!buffer) {
             return console.error('Error decoding file:', path);
         }
         buffers[i] = {buffer: buffer}
         audio.loaded++
         if (audio.loaded >= buffers.length) {
           audio.trigger('loaded')
         }
      }, function(e){console.error('Error decoding file',e);});
  };
  req.onerror = function() {
    console.error('XHR error loading file:', path);
  };
  req.send();
}