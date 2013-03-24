// I know these global fuctions are wrong. I know!

document.ontouchstart = function(e){
    e.preventDefault();
}

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

// Returns total canvas images that have to be preloaded
game.totalCanvasImages = function(level) {
  var totalImages = 0;
    level.layers.forEach(function(layer) {
      // One image per layer
      totalImages++;
      
        layer.tiles.forEach(function(tile) {
            totalImages++;
        });
    });
  return totalImages;
}

// Static game buttons, backgrounds etc
game.otherImages = [
  'images/again_btn-01.png',
  'images/background_game.png',
  'images/great_finish-01.png',
  'images/next_btn-01.png',
  'images/play_btn.png',
  'images/start_bg-01.png',
  'images/background_game_blur.png',
  'images/buy_btn-02.png',
  'images/preview-04.jpg'
  ];

game.audioLoaded = false;
game.imagesLoaded = false;
game.isFullyLoaded = function(audio, images){
    if (audio) game.audioLoaded = true;
    if (images) game.imagesLoaded = true;

    if (game.audioLoaded && game.imagesLoaded) {
        console.debug('Game fully loaded');
        game.trigger('loaded');
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
	audio.playSoundEffect();
    if (currentLayer < level.layers.length - 1) {
        currentLayer++;
        game.trigger('layerComplete');
        startNextLayer()
    } else {


        endGame(); // We only have one level currently

    }
}

function startNextLayer() {
  audio.loadTrack(currentLayer)
  firstPoint=true
  setupLayer(level.layers[currentLayer].tiles, level.layers[currentLayer].src);
}

function layerProgress() {

}


function startGame() {
  $('#canvas #canvasbg').addClass('is-visible')
  $('#canvas #canvasbg').addClass('is-blur')

  level.layers = level.layers.map(function(l) {
    l.tiles = l.tiles.map(function(t) {
      t.l = parseInt(t.l)
      t.t = parseInt(t.t)
      t.b = parseInt(t.b)
      t.r = parseInt(t.r)
      t.x = parseInt(t.x)
      t.y = parseInt(t.y)

      if (l.x) {
        t.x += l.x
        t.l += l.x
      }
      if (l.y) {
        t.y += l.y
        t.t += l.y
      }
      return t
    })

    return l
  })

    console.debug('Total levels: %s', level.layers.length);
    currentLayer = 0;
    setupLayer(level.layers[currentLayer].tiles, level.layers[currentLayer].src);
    audio.loadTrack(0)
    initCanvas();
}

function resetGame() {
  currentLayer = -1;
  audio.stopAll();

  // Tõnis had some fun at startGame, this makes his fun go around another time
  level = JSON.parse(JSON.stringify(firstLevel));

  // Almost a hack
  audio.prepareAudio(level);

  game.trigger('reset');
  startGame();
}

function nextLevel() {
  game.trigger('nextLevel');
}

function endGame() {

    $('#canvas #canvasbg').removeClass('is-blur')
    console.debug('Game ended');
    game.trigger('end');
    GameAnimations.play(20000);
}

function preloadImages(level) {
    var preloadTotalImages = game.totalCanvasImages(level) + game.otherImages.length;
    console.debug('Total images to load: %s', preloadTotalImages);
    var loaded = 0;
    
    game.otherImages.forEach(function(curr) {
      var img = new Image();
      img.src = curr;
      
      if (img.width && img.height) {
        loaded++;
      }else{
        img.onload = function() {
          loaded++;
          if(loaded >= preloadTotalImages) {
            game.trigger('imagesLoaded');
          }
        }
      }
    });
    
    level.layers.forEach(function(layer) {

        layer.tiles.forEach(function(tile) {
          var img = new Image();
          img.src = tile.src;
          
          img.onload = function() {
            loaded++
            if(loaded >= preloadTotalImages) {
              game.trigger('imagesLoaded');
            }
          }
        });
        var img = new Image();
        img.src = layer.src;
        img.onload = function() {
          loaded++
          if(loaded >= preloadTotalImages) {
            game.trigger('imagesLoaded');
          }
        }
    });
}

var currentLayer = -1;

var firstLevel = {
  "name": "twinkle",
  "layers": [
    {
      "tiles": [
        {
          "x": 18,
          "y": 62,
          "src": "twinkle/tile0_0.png",
          "b": "57",
          "l": "18",
          "t": "8",
          "r": "66"
        },
        {
          "x": 79,
          "y": 10,
          "src": "twinkle/tile0_1.png",
          "b": "28",
          "l": "79",
          "t": "0",
          "r": "112"
        },
        {
          "x": "186",
          "y": "22",
          "src": "twinkle/tile0_2.png",
          "b": "84",
          "l": "186",
          "t": "20",
          "r": "58"
        },
        {
          "x": 239,
          "y": 98,
          "src": "twinkle/tile0_3.png",
          "b": "107",
          "l": "218",
          "t": "98",
          "r": "33"
        },
        {
          "x": 218,
          "y": 200,
          "src": "twinkle/tile0_4.png",
          "b": "55",
          "l": "129",
          "t": "200",
          "r": "95"
        },
        {
          "x": 129,
          "y": 249,
          "src": "twinkle/tile0_5.png",
          "b": "38",
          "l": "42",
          "t": "217",
          "r": "92"
        },
        {
          "x": "42",
          "y": 220,
          "src": "twinkle/tile0_6.png",
          "b": "86",
          "l": "1",
          "t": "140",
          "r": "49"
        },
        {
          "x": 2,
          "y": 140,
          "src": "twinkle/tile0_7.png",
          "b": "87",
          "l": "0",
          "t": "58",
          "r": "24"
        }
      ],
      x: 390,
      y: 405,
      "src": "twinkle/earth.png",
      "audio": "twinkle/twink1_bass.mp3"
    },
    {
      "tiles": [
        {
          "x": 18,
          "y": 15,
          "src": "twinkle/tile1_0.png",
          "r": "105",
          "l": "17",
          "t": "0",
          "b": "23"
        },
        {
          "x": 117,
          "y": 6,
          "src": "twinkle/tile1_1.png",
          "r": "67",
          "l": "117",
          "t": "3",
          "b": "45"
        },
        {
          "x": 180,
          "y": 42,
          "src": "twinkle/tile1_2.png",
          "r": "40",
          "l": "176",
          "t": "40",
          "b": "98"
        },
        {
          "x": 212,
          "y": 134,
          "src": "twinkle/tile1_3.png",
          "r": "60",
          "l": "157",
          "t": "132",
          "b": "102"
        },
        {
          "x": 162,
          "y": 229,
          "src": "twinkle/tile1_4.png",
          "r": "93",
          "l": "76",
          "t": "227",
          "b": "34"
        },
        {
          "x": 79,
          "y": 257,
          "src": "twinkle/tile1_5.png",
          "r": "74",
          "l": "78",
          "t": "157",
          "b": "104"
        },
        {
          "x": 148,
          "y": "158",
          "src": "twinkle/tile1_6.png",
          "r": "32",
          "l": "122",
          "t": "72",
          "b": "89"
        },
        {
          "x": 124,
          "y": 76,
          "src": "twinkle/tile1_7.png",
          "r": "130",
          "l": "0",
          "t": "13",
          "b": "67"
        }
      ],
      x: 718,
      y: 130,
      "src": "twinkle/zzz_moon.png",
      "audio": "twinkle/twink1_strings.mp3"
    },
    {
      "tiles": [
        {
          "x": 3,
          "y": 132,
          "src": "twinkle/tile2_0.png",
          "l": 0,
          "t": "94",
          "r": "102",
          "b": "45"
        },
        {
          "x": 95,
          "y": 97,
          "src": "twinkle/tile2_1.png",
          "l": "93",
          "t": 0,
          "r": "41",
          "b": "104"
        },
        {
          "x": 129,
          "y": 3,
          "src": "twinkle/tile2_2.png",
          "l": "128",
          "t": 0,
          "r": "72",
          "b": "84"
        },
        {
          "x": 194,
          "y": 79,
          "src": "twinkle/tile2_3.png",
          "l": "194",
          "t": "77",
          "r": "107",
          "b": "14"
        },
        {
          "x": 296,
          "y": 83,
          "src": "twinkle/tile2_4.png",
          "l": "241",
          "t": "78",
          "r": "60",
          "b": "94"
        },
        {
          "x": 242,
          "y": 166,
          "src": "twinkle/tile2_5.png",
          "l": "241",
          "t": "163",
          "r": "34",
          "b": "108"
        },
        {
          "x": 270,
          "y": 267,
          "src": "twinkle/tile2_6.png",
          "l": "173",
          "t": "238",
          "r": "102",
          "b": "34"
        },
        {
          "x": 174,
          "y": 242,
          "src": "twinkle/tile2_7.png",
          "l": "87",
          "t": "237",
          "r": "92",
          "b": "65"
        },
        {
          "x": 89,
          "y": 296,
          "src": "twinkle/tile2_8.png",
          "l": "78",
          "t": "195",
          "r": "15",
          "b": "107"
        },
        {
          "x": 80,
          "y": 197,
          "src": "twinkle/tile2_9.png",
          "l": "0",
          "t": "130",
          "r": "84",
          "b": "71"
        }
      ],
      x: 93,
      y: 113,
      "src": "twinkle/twinkle_star.png",
      "audio": "twinkle/twink1_lead.mp3"
    }
  ]
}
var level = JSON.parse(JSON.stringify(firstLevel))

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
