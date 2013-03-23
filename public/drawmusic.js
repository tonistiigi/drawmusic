// I know these global fuctions are wrong. I know!

function preloadResources() {
    audio.on('loaded', function() {
        game.isFullyLoaded(true, null);
    });

    game.on('imagesLoaded', function() {
        game.isFullyLoaded(null, true);
    });


    // Just load one level resources for now
    audio.prepareAudio(level);
    preloadImages(level);


}

var audio = $({}); // DUMMY

audio.prepareAudio = function (level) {
    // DUMMY
    audio.trigger('loaded');
}

var game = $({});
game.audioLoaded = false;
game.imagesLoaded = false;
game.isFullyLoaded = function(audio, images){
    if (audio) game.audioLoaded = true;
    if (images) game.imagesLoaded = true;

    if (game.audioLoaded && game.imagesLoaded) {
        console.debug('Game fully loaded');
        game.trigger('loaded'); // Useless, as images aren't loaded when this is fired!
    }

}

function setupLayers(points, endImage) {
    // NOT MY CODE TO WRITE, remove as you want (Indrek)
    console.debug('Setting up new layer with first point as x: %s y: %s with endImage: %s',
        points[0].x, points[0].y, endImage);

    // When we're done
    layerComplete();
}

function layerComplete() {
    console.debug('Layer %s complete.', currentLayer);
    if (currentLayer < level.layers.length - 1) {
        currentLayer++;
        game.trigger('layerComplete');
    } else {
        endGame(); // We only have one level currently
    }
}

function startNextLayer() {
    setupLayers(level.layers[currentLayer].tiles, level.layers[currentLayer].src);
}

function layerProgress() {

}


function startGame() {
    console.debug('Total levels: %s', level.layers.length);
    currentLayer = 0;
    setupLayers(level.layers[currentLayer].tiles, null);
}

function endGame() {
    console.debug('Game ended');
    game.trigger('end');
}

function preloadImages(level) {
    level.layers.forEach(function(layer) {

        layer.tiles.forEach(function(tile) {
            if (tile.src != null) {
                var img = new Image();
                img.src = tile.src;
            }
        });
        var img = new Image();
        img.src = layer.src;
    });
    game.trigger('imagesLoaded');
}

var currentLayer = -1;

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


// dummy loading
var currentTrack = 0;
var progress = 0;
function playMore() {
  audio.loadTrack(currentTrack)
  progress += 10
  audio.setProgress(progress)
  if (progress >= 100) {
    currentTrack++
    progress = 0
    if (currentTrack >= level.layers.length) {
      clearInterval(interval)

    }
  }

}
var interval = setInterval(playMore, 500)


/*    { tiles: [
      {x: 100, y: 100, src: null},
      {x: 100, y: 200, src: 'twinkle_l1t1.png'},
	  {x: 200, y: 200, src: 'twinkle_l1t2.png'}
      ],
      src: 'http://s22.postimg.org/6l8ogm9gv/large_Img.png',
      audio: 'audio.mp3'
    },

	{ tiles: [
      {x: 200, y: 200, src: null},
      {x: 200, y: 100, src: 'twinkle_l2t1.png'},
	  {x: 100, y: 100, src: 'twinkle_l2t2.png'}
      ],
      src: 'img.png',
      audio: 'audio.mp3'*/

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
