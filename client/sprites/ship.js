
import { Math } from '/shared/math.js';

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
  // this.animations.add('gasOn', [1]);
	// this.animations.add('gasOff', [0]);

	// enable physics on the Ship
  this.game.physics.arcade.enableBody(this);
	this.body.drag.set(shipProps.drag);
	this.body.maxVelocity.set(shipProps.maxVelocity);
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.update = function(){
  if (this.state.k.u)
    this.gasOn();
  else 
    this.gasOff();
  
  if (this.state.k.l) this.rotate(1);
	else if (this.state.k.r) this.rotate(0);
	else this.rotate(.5);
}

Ship.prototype.gasOn = function(){
	// this.animations.play('gasOn', 1, true);
  this.game.physics.arcade.accelerationFromRotation(
    Math.radians(this.body.rotation), 
    shipProps.acceleration, 
    this.body.acceleration
  );
}

Ship.prototype.gasOff = function(){
	// this.animations.play('gasOff', 1, true);
	this.body.acceleration.set(0);
}

Ship.prototype.rotate = function(rotation){
  this.body.angularVelocity = 
    (.5 - rotation) * shipProps.angularVelocity;
}

Ship.prototype.death = function(){
	// animate
	this.kill();
};

Ship.prototype.getState = function(){
  return {
    i: this.state.i, 
    p: { 
      x: this.body.x,
      y: this.body.y,
      a: this.body.angle // FIXME:
    },
    v: { // velocity
      x: this.body.velocity.x,
      y: this.body.velocity.y, 
      a: this.body.angularVelocity
    },
    a: {
      x: this.body.acceleration.x, // acceleration
      y: this.body.acceleration.y
    },
    h: 100, // health
    k: { // keys
      u: this.state.k.u, // up
      l: this.state.k.l, // left
      r: this.state.k.r // right
    }
  };
}

Ship.prototype.sendKeyNoRotation = function(){
  if(this.state.k.r || this.state.k.l){
    this.state.k.r = false;
    this.state.k.l = false;
    this.game.sendStateChange();
  }
}

Ship.prototype.sendKeyLeft = function(){
  if(!this.state.k.l){
    this.state.k.r = false;
    this.state.k.l = true;
    this.game.sendStateChange();
  }
}

Ship.prototype.sendKeyRight = function(){
  if(!this.state.k.r){
    this.state.k.r = true;
    this.state.k.l = false;
    this.game.sendStateChange();
  }
}

Ship.prototype.sendKeyUp = function(isDown) {
  if(this.state.k.u !== isDown){
    this.state.k.u = isDown;
    this.game.sendStateChange();
  }
}

Ship.prototype.recvStateChange = function(data){
  this.state = data;
}


export { Ship };