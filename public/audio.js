var audio = $({})

var AudioContext = window.AudioContext || window.webkitAudioContext
var buffers = []

audio.prepareAudio = function (level) {
  audio.playing = false
  audio.context = new AudioContext
  audio.gain = audio.context.createGainNode()
  audio.gain.connect(audio.context.destination)
  audio.loaded = 0
  level.layers.map(function(layer, i) {
    return loadBuffer(layer, i)
  })

  loadBuffer({audio: 'twinkle/twink1_drums.mp3'}, level.layers.length)

  audio.on('loaded', function() {
    if (audio.nextTrack) audio.loadTrack(audio.nextTrack)
    audio.nextTrack = 0
    audio.play()
  })
audio.prepareSound('twinkle/magic_bell.mp3')
}
audio.playSoundEffect=function(){
audio.playSound('twinkle/magic_bell.mp3')
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
  if (audio.playing) return

  buffers.forEach(function(b, index) {
    b.source = audio.context.createBufferSource()
    b.source.buffer = b.buffer
    b.gain = audio.context.createGainNode()
    b.gain.connect(audio.gain)
    b.gain.gain.value = 0
    b.vol = 0
    b.source.connect(b.gain)
    b.source.noteOn(0)
    b.time = audio.context.currentTime
  })

  var last = buffers[buffers.length - 1]
  last.vol = last.gain.gain.value = 1

  audio.playing = true

  audio.timeout = setTimeout(function() {
    replay()
  }, buffers[0].buffer.duration * 1000  - 150)

}

audio.pause = function() {
  // not implemented
}

audio.loadTrack = function(index) {
  audio.active = index
}

function replay() {
  buffers.forEach(function(b, index) {
    b.source = audio.context.createBufferSource()
    b.source.buffer = b.buffer
    b.gain = audio.context.createGainNode()
    b.gain.connect(audio.gain)
    b.gain.gain.value = b.vol
    b.source.connect(b.gain)
   // console.log('replay', b.time ,b.buffer.duration, audio.context.currentTime)
    b.source.noteOn(b.time + b.buffer.duration - audio.context.currentTime)
    b.time = audio.context.currentTime
  })
  audio.timeout = setTimeout(function() {
    replay()
  }, buffers[0].buffer.duration * 1000  - 150)
}

audio.setProgress = function(val) {
  //console.log('progress', audio.active, val / 100)
  buffers[audio.active].vol = buffers[audio.active].gain.gain.value = val / 100
}

audio.setComplete = function() {
  buffers[audio.active].vol = 1
  buffers[audio.active].gain.gain.value = 1
}

audio.stopAll = function() {
  buffers.forEach(function(b) {
    b.source.noteOff(0)
  })
  clearTimeout(audio.timeout);
  audio.playing = false;
}

var prepared = {}
audio.prepareSound = function(path) {
  var req = new XMLHttpRequest();
  req.open('GET', path, true);
  req.responseType = 'arraybuffer';
  req.onload = function() {
      audio.context.decodeAudioData(req.response, function(buffer) {
         if (!buffer) {
             return console.error('Error decoding file:', path);
         }
         prepared[path] = buffer
      }, function(e){console.error('Error decoding file',e);});
  };
  req.onerror = function() {
    console.error('XHR error loading file:', path);
  };
  req.send();
}
audio.playSound = function(path) {
  var buffer = prepared[path]
  var source = audio.context.createBufferSource()
  source.buffer = buffer
  var gain = audio.context.createGainNode()
  gain.connect(audio.gain)
  gain.gain.value = 1
  source.connect(gain)
 // console.log('replay', b.time ,b.buffer.duration, audio.context.currentTime)
  source.noteOn(0)
}

function loadBuffer(layer, i) {
  buffers[i] = null
  var req = new XMLHttpRequest();
  req.open('GET', layer.audio, true);
  req.responseType = 'arraybuffer';
  req.onload = function() {
      audio.context.decodeAudioData(req.response, function(buffer) {
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