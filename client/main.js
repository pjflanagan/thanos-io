import { ClientSocket } from './socket.js';
import { Ship } from './sprites/ship.js';
import { GAME } from '../shared/const.js';

/**
 * @event onload
 */
window.onload = function () {
  let W = $(window).width();
  let H = $(window).height();
	const game = new Phaser.Game(W, H, Phaser.CANVAS, 'game');
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
    this.game.world.setBounds(0,0, GAME.WORLD.WIDTH, GAME.WORLD.HEIGHT);
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
    this.game.camera.follow(this.self);
  },

  shareSelf: function(){
    return this.self.getState();
  },

  addUser: function(data){
    this.ShipGroup.add(new Ship(this, data));
  }
};