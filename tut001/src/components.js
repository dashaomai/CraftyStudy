Crafty.c('Grid', {
  init: function() {
    this.requires('2D');
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return {
        x: this.x / Game.map_grid.tile.width,
        y: this.y / Game.map_grid.tile.height
      };
    } else {
      this.attr({
        x: x * Game.map_grid.tile.width,
        y: y * Game.map_grid.tile.height
      });
      return this;
    }
  }
});

Crafty.c('Actor', {
  init: function() {
    this.requires('Canvas, Grid');
  }
});

Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 125, 40)');
  }
});

Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 185, 40)');
  }
});

Crafty.c('Village', {
  init: function() {
    this.requires('Actor, Color')
      .color('rgb(170, 125, 40)');
  },

  collect: function() {
    this.destroy();
    Crafty.trigger('VillageVisited', this);
  }
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
      .fourway(4)
      .color('rgb(20, 75, 40)')
      .stopOnSolids()
      .onHit('Village', this.visitVillage);
  },

  stopOnSolids: function() {
    return this.onHit('Solid', this.stopMovement);
  },

  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitVillage: function(data) {
    var village = data[0].obj;
    village.collect();
  }
});
