Game = {
  map_grid: {
    width: 24,
    height: 16,
    tile: {
      width: 16,
      height: 16
    }
  },

  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  // Initialize and start our game
  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(87, 109, 20)');

    Crafty.scene('Loading');
  }
};

$text_css = {
  'font-size': '24px',
  'font-family': 'Arial',
  'color': 'white',
  'text-align': 'center'
};
