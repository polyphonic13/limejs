goog.provide('tractor.Land');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */

tractor.Land = function(gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('images/bare_land.png');

	this.state = this.EMPTY;
	console.log('this.EMPTY = ' + this.EMPTY);
	
	var land = this;
    goog.events.listen(this,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();        
		console.log('land click, state = ' + land.state, '\tmoney = ' + playerObj.money, '\tcrops = ' + gameObj.crops[playerObj.currentCrop].cost);
        if(land.state == land.EMPTY && playerObj.money >= gameObj.costPlowing) {
			console.log('plowing land');
            //plow land
            land.setFill('images/plowed.png')
            land.state = land.PLOWED;

            //update player money
            playerObj.money -= gameObj.costPlowing;
            gameObj.updateMoney();
		} else if(land.state == land.PLOWED && playerObj.money >= gameObj.crops[playerObj.currentCrop].cost) {
			console.log('land plowed, growing: ' + playerObj.currentCrop);
		        //plant
		        land.setFill('images/growing.png');
		        land.state = land.GROWING;

		        //store crop and left time for it to be ready and to die
		        land.crop = playerObj.currentCrop;
		        land.ripeTime = gameObj.crops[playerObj.currentCrop].time_to_ripe * 1000;
		        land.deathTime = gameObj.crops[playerObj.currentCrop].time_to_death * 1000;

		        //update player money
		        playerObj.money -= gameObj.crops[playerObj.currentCrop].cost;
		        gameObj.updateMoney();
	    } else if(land.state == land.READY ) {
			console.log('land ready');
		        //harvest
		        land.setFill('images/bare_land.png');
		        land.state = land.EMPTY;

		        //update player money
		        playerObj.money += gameObj.crops[land.crop].revenue;
		        gameObj.updateMoney();
		}
	});
	
		//growing plants
		dt = 1000;
		lime.scheduleManager.scheduleWithDelay(function() {
		    if(this.state == land.GROWING) {            
		        if(this.ripeTime <= 0) {
		            this.state = land.READY;
		            this.setFill('images/'+gameObj.crops[this.crop].image);
		        }
		        else {
		            this.ripeTime -= dt;
		        }
		    }
		    else if(this.state == land.READY) {
		        if(this.deathTime <= 0) {
		            this.state = land.EMPTY;
		            this.setFill('images/bare_land.png');
		        }
		        else {
		            this.deathTime -= dt;
		        }
		    }
		}, this, dt);

}

goog.inherits(tractor.Land,lime.Sprite);

tractor.Land.prototype.EMPTY = 0;
tractor.Land.prototype.PLOWED = 1;
tractor.Land.prototype.GROWING = 2;
tractor.Land.prototype.READY = 3;

