Crafty.scene('Game', function() {
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var x=0; x<Game.map_grid.width; x++) {
    this.occupied[x] = new Array(Game.map_grid.height);
    for (var y=0; y<Game.map_grid.height; y++) {
      this.occupied[x][y] = false;
    }
  }

  Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[5][5] = true;

  var max_villages = 5;

  for (x=0; x<Game.map_grid.width; x++) {
    for (y=0; y<Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 ||
                    y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        Crafty.e('Tree').at(x, y);
        this.occupied[x][y] = true;
      } else if (!this.occupied[x][y] && Math.random() < 0.06) {
        Crafty.e('Bush').at(x, y);
        this.occupied[x][y] = true;
      } else if (!this.occupied[x][y] && Crafty('Village').length < max_villages && Math.random() < 0.02) {
        Crafty.e('Village').at(x, y);
        this.occupied[x][y] = true;
      }
    }
  }

  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  this.unbind('VillageVisited', this.show_victory);
});

Crafty.scene('Victory', function() {
  Crafty.e('2D, DOM, Text')
    .attr({x: 0, y: 0})
    .text('Victory!');

  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  this.unbind('KeyDown', this.restart_game);
});
