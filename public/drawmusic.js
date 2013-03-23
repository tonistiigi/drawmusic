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
/*
function setupLayers(points, endImage) {
    // NOT MY CODE TO WRITE, remove as you want (Indrek)
    console.debug('Setting up new layer with first point as x: %s y: %s with endImage: %s',
        points[0].x, points[0].y, endImage);

    // When we're done

    setTimeout(function() {
      layerComplete();
    }, 4000)
}
*/
function layerComplete() {
    console.debug('Layer %s complete.', currentLayer);
    audio.setComplete()
    if (currentLayer < level.layers.length - 1) {
        currentLayer++;
        game.trigger('layerComplete');
    } else {
        endGame(); // We only have one level currently
    }
}

function startNextLayer() {
  audio.loadTrack(currentLayer)
  setupLayer(level.layers[currentLayer].tiles, level.layers[currentLayer].src);
}

function layerProgress() {

}


function startGame() {
    console.debug('Total levels: %s', level.layers.length);
    currentLayer = 0;
    setupLayer(level.layers[currentLayer].tiles, level.layers[currentLayer].src);
    audio.loadTrack(0)
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
        /*
        img.onload = function() {
          loaded++
          if(loaded >= totalImages)
        }*/
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
          "x": 4,
          "y": 148,
          "src": "twinkle/tile0.png",
          "l": "0",
          "t": "102",
          "r": "115",
          "b": "48"
        },
        {
          "x": 100,
          "y": 102,
          "src": "twinkle/tile1.png",
          "l": "95",
          "t": "0",
          "r": "50",
          "b": "115"
        },
        {
          "x": 142,
          "y": 7,
          "src": "twinkle/tile2.png",
          "l": "140",
          "t": "0",
          "r": "70",
          "b": "102"
        },
        {
          "x": 190,
          "y": 85,
          "src": "twinkle/tile3.png",
          "l": "203",
          "t": "85",
          "r": "122",
          "b": "15"
        }
      ],
      "src": "twinkle/star.png",
      "audio": "twinkle/twink1_lead.mp3"
    }
  ]
}

/*
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
var interval = setInterval(playMore, 500)*/


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
