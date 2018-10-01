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

class Ship extends Phaser.GameObjects.Sprite {
	constructor(data) {
    super();
    this.state = data;
    Phaser.Sprite.call(this, game, data.p.x, data.p.y, 'imgShip');
    this.angle = data.p.a;
    this.anchor.set(0.5, 0.5);
    this.fireable = false;
    // this.interval = 0;

    // add gas animation as options
    this.animations.add('gasOn', [1]); 
    this.animations.add('gasOff', [0]);

    // enable physics on the ship
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(shipProps.drag);
    this.body.maxVelocity.set(shipProps.maxVelocity);
  }
  
  getState(){
    return this.state;
  }

  update(){
    if (this.state.k.l) this.rotate(1);
		else if (this.state.k.r) this.rotate(0);
		else this.rotate(.5);
		
		if (this.state.k.u) this.gasOn();
		else this.gasOff();
  }

  gasOn(){
    this.animations.play('gasOn', 1, true);
	  this.game.physics.arcade.accelerationFromRotation(Math.radians(this.body.rotation), shipProps.acceleration, this.body.acceleration);
  }

  gasOff () {
    this.animations.play('gasOff', 1, true);
    this.body.acceleration.set(0);
  }

  rotate(){
	  this.body.angularVelocity = (.5 - rotation) * shipProps.angularVelocity;
  }

  /* 

  we should only worry about fireable for the players ship, so this should be in ClientGame

  reload(){
    var ship = this;
    this.interval = setTimeout(function () {
      ship.fireable = true;
    }, shipProps.reloadInterval);
  }

  shoot(){
    if (!this.fireable) return;
    this.fireable = false;
    this.reload();

    let x = this.body.x + this.body.halfWidth;
    let y = this.body.y + this.body.halfHeight;
    this.bullets.add(new Bullet(this.game, x, y, Math.radians(this.body.rotation), this));
  } 
  */

  death(){
    clearTimeout(this.interval);
	  this.kill();
  }
}

export { Ship };