goog.provide('tractor.Land');
goog.require('lime.Sprite');

tractor.Land = function(gameObj, playerObj) {

	goog.base(this);
	this.setAnchorPoint(0, 0);
	this.setSize(gameObj.tile_size, gameObj.tile_size);
	this.setFill('images/bare_land.png');
	
	this.state = this.EMPTY;

	var land = this;
    goog.events.listen(this,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();        
        if(land.state == land.EMPTY && playerObj.money >= gameObj.costPlowing) {
            //plow land
            land.setFill('images/plowed.png')
            land.state = land.PLOWED;

            //update player money
            playerObj.money -= gameObj.costPlowing;
            gameObj.updateMoney();
        }
    });
}

tractor.Land.prototype.EMPTY = 0;
tractor.Land.prototype.PLOWED = 1;
tractor.Land.prototype.GROWING = 2;
tractor.Land.prototype.READY = 3;

goog.inherits(tractor.Land, lime.Sprite);