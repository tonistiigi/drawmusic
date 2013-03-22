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
    if (audio.nextTrack) audio.startLayer(audio.nextTrack)
    audio.nextTrack = 0
    audio.play()
  })

}

audio.startLayer = function(index) {
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
         buffers[i] = buffer
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