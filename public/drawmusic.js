// I know these global fuctions are wrong. I know!

function preloadResources() {
    preloadImages(level);
}

function setupLayers(points, endImage) {
    // NOT MY CODE TO WRITE, remove as you want (Indrek)
    console.debug('Setting up new layer with first point as x: %s y: %s with endImage: %s',
        points[0].x, points[0].y, endImage);
        
    // When we're done
    layerComplete();
}

function layerComplete() {
    console.debug('Level %s complete.', currentLayer);
    if (currentLayer < level.layers.length - 1) {
        currentLayer++;
        setupLayers(level.layers[currentLayer].tiles, level.layers[currentLayer].src);
    } else {
        endGame(); // We only have one level currently
    }
}

function layerProgress() {

}


function startGame() {
    alert('Careful, we are now starting!');
    console.debug('Total levels: %s', level.layers.length);
    currentLayer = 0;
    setupLayers(level.layers[currentLayer].tiles, null);
}

function endGame() {
    console.debug('Game ended');
    alert('Well done. Would you like to buy our "Bird is the Word" version?');
}

function preloadImages(level) {
    level.layers.forEach(function(layer) {
    
        layer.tiles.forEach(function(tile) {
            if (tile.src != null) {
                var img = new Image();
                img.src = tile.src;
                console.debug('Successfully preloaded image %s', img.src);
            }
        });
        
    });
}

var currentLayer = -1;

var level = {
  name: 'twinkle',
  layers: [
    { tiles: [
      {x: 100, y: 100, src: null},
      {x: 100, y: 200, src: 'twinkle_l1t1.png'},
	  {x: 200, y: 200, src: 'twinkle_l1t2.png'}
      ],
      src: 'img.png',
      audio: 'audio.mp3'
    },
	
	{ tiles: [
      {x: 200, y: 200, src: null},
      {x: 200, y: 100, src: 'twinkle_l2t1.png'},
	  {x: 100, y: 100, src: 'twinkle_l2t2.png'}
      ],
      src: 'img.png',
      audio: 'audio.mp3'
    }
  ],
  duration: 12.3
}

