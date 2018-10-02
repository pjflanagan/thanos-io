var shipProps = {
	acceleration: 320,
	drag: 40,
	maxVelocity: 260,
  angularVelocity: 500,
  default: {
    angle: -90
  },
  reloadInterval: 200
};

/**
 * @class Ship @extends Phaser.Sprite
 */
var Ship = function(game, data) {
  Phaser.Sprite.call(this, game, data.p.x, data.p.y, 'imgShip');
  
  this.state = data;
  
  this.anchor.set(0.5, 0.5);
  this.angle = data.p.a;
	  
  // add flap animation and start to play it
  // this.index = index;
	// var i=index*2;
	// this.animations.add('flap', [i, i+1]);
	// this.animations.play('flap', 8, true);

	// enable physics on the Ship
  this.game.physics.arcade.enableBody(this);
	this.body.drag.set(shipProps.drag);
	this.body.maxVelocity.set(shipProps.maxVelocity);
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.death = function(){
	// animate
	this.kill();
};

Ship.prototype.getState = function(){
  return this.state;
}


export { Ship };