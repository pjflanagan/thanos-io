import { ClientSocket } from './socket.js';
import { Ship } from './sprites/ship.js';

/**
 * @event onload
 */

window.onload = function () {
	var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');
	game.state.add('Main', App.Main);
	game.state.start('Main');
};

/**
 * Main program
 */
var App = {};

App.Main = function(game){}

App.Main.prototype = {
	preload : function(){
    this.game.load.spritesheet(
      'imgShip', 
      '/client/assets/img_ship.png', 
      36, 36, 20
    );
		this.game.load.spritesheet(
      'imgBullet', 
      '/client/assets/img_bullet.png', 
      18, 18, 3
    );
	},
	
	create : function(){
    this.ShipGroup = this.game.add.group();
    this.addSocket();
	},
	
	update : function(){		

  },
  
  addSocket: function(){
    this.socket = new ClientSocket(this);
  },

  addSelf: function(data){
    this.self = new Ship(this, data);
    this.ShipGroup.add(this.self);
  }
};