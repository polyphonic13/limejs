//set main namespace
goog.provide('tractor');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton'); 
goog.require('tractor.Land');

// entrypoint
tractor.start = function(){

	var gameObj = {
		width: 320,
		height: 480,
	   tile_size: 64,
	    num_tiles_x: 5,
	    num_tiles_y: 6,
	    landLayer_w: 64*5, 
	    landLayer_h: 64*6,
	    controlsLayer_w: 64*5,
	    controlsLayer_h: 64*1.5,
	    costPlowing: 5,

	    //shop
	    shop_margin_x: 50,
	    shop_margin_y: 20
	};
	
	var director = new lime.Director(document.body, gameObj.width, gameObj.height);

    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);        

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);

    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);

    director.replaceScene(gameScene); 

	//shop
	var shopScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	var shopLayer = new lime.Layer().setAnchorPoint(0, 0);

	var shopBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
	    .setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
	shopLayer.appendChild(shopBackground);
	shopScene.appendChild(shopLayer);

	//close button
	var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
	    .setPosition(gameObj.width/2, gameObj.height-25)
	    .setSize(80, 40);
	shopLayer.appendChild(closeButton);

	//launch shop event
	goog.events.listen(shopButton,['mousedown', 'touchstart'], function(e) {
	    director.replaceScene(shopScene);
	});

	//close shop event
	goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
	    director.replaceScene(gameScene);
	});
	
	//player object
	var playerObj = {
	    money: 300,
	    currentCrop: 0             
	}
	
	gameObj.crops = [
	    {
	        name: 'tomato',
	        cost: 10,
	        revenue: 18,
	        time_to_ripe: 10, //secods
	        time_to_death: 30, //second from when it's ripe
	        image: 'tomato.png'
	    },
	    {
	        name: 'artichoke',
	        cost: 20,
	        revenue: 38,
	        time_to_ripe: 60,
	        time_to_death: 60,
	        image: 'artichoke.png'
	    },
	    {
	        name: 'lettuce',
	        cost: 15,
	        revenue: 26,
	        time_to_ripe: 30,
	        time_to_death: 60,
	        image: 'lettuce.png'
	    },
	    {
	        name: 'eggplant',
	        cost: 30,
	        revenue: 78,
	        time_to_ripe: 120,
	        time_to_death: 120,
	        image: 'eggplant.png'
	    },
	    {
	        name: 'peppers',
	        cost: 40,
	        revenue: 82,
	        time_to_ripe: 180,
	        time_to_death: 180,
	        image: 'peppers.png'
	    }
	];

	//controls area
	var controlArea = new lime.Sprite().setAnchorPoint(0,0)
	    .setPosition(0, gameObj.height-gameObj.controlsLayer_h)
	    .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
	    .setFill('#0D0D0D')
	controlsLayer.appendChild(controlArea);

	//shop button
	var shopButton = new lime.GlossyButton().setColor('#133242').setText('Shop')
	    .setPosition(60, gameObj.height-gameObj.controlsLayer_h/2)
	    .setSize(80, 40);
	controlsLayer.appendChild(shopButton); 

	//money
	var moneyLabel = new lime.Label().setText('$'+playerObj.money).setFontColor('#E8FC08')
	    .setPosition(gameObj.controlsLayer_w-50, gameObj.height-gameObj.controlsLayer_h/2);
	controlsLayer.appendChild(moneyLabel); 
	
	//updating money indicator
	gameObj.updateMoney = function() {
	    moneyLabel.setText('$'+playerObj.money);
	};

	
	//create land elements
	for(var i=0; i<gameObj.num_tiles_x; i++) {
	   for(var j=0; j<gameObj.num_tiles_y; j++) {
	       var landElement = new tractor.Land(gameObj, playerObj).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
	       landLayer.appendChild(landElement);
	   }
	}
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('tractor.start', tractor.start);
