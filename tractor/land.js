goog.provide('tractor.Land');
goog.require('lime.Sprite');

farming.Land = function(gameObj, playerObj) {
		goog.base(this);
		this.setAnchorPoint(0, 0);
		this.setSize(gameObj.tile_size, gameObj.tile_size);
		this.setFill('images/bare_land.png');
		
		
}

goog.inherits(tractor.Land, lime.Sprite);