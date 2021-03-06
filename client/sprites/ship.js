import { bulletProps } from './bullet.js';

Math.radians = function (degrees) {
	return degrees * Math.PI / 180; // Converts from degrees to radians
};

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
var Ship = function (app, game, data) {
	Phaser.Sprite.call(this, game, data.p.x, data.p.y, 'imgShip');
	this.app = app;
	this.game = game;

	this.state = data;
	this.keys = { u: data.k.u, l: data.k.l, r: data.k.r };

	this.anchor.set(0.5, 0.5);
	this.angle = data.p.a;

	// this.index = index;
	// var i=index*2;
	this.animations.add('gasOn', [1]);
	this.animations.add('gasOff', [0]);
	this.scale.setTo(.5, .5);

	// enable physics on the Ship
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.drag.set(shipProps.drag);
	this.body.collideWorldBounds = true;
	this.body.maxVelocity.set(shipProps.maxVelocity);

	let self = this;
	this.interval = setInterval(() => {
		self.app.sendStateUpdate();
	}, 500);

	this.fireable = true;
};

Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.update = function () {
	if (this.state.k.u) this.gasOn();
	else this.gasOff();

	if (this.state.k.l === this.state.k.r) this.rotate(.5);
	else if (this.state.k.r) this.rotate(0);
	else this.rotate(1);
}

Ship.prototype.gasOn = function () {
	this.animations.play('gasOn', 1, true);
	this.game.physics.arcade.accelerationFromRotation(
		Math.radians(this.body.rotation),
		shipProps.acceleration,
		this.body.acceleration
	);
}

Ship.prototype.gasOff = function () {
	this.animations.play('gasOff', 1, true);
	this.body.acceleration.set(0);
}

Ship.prototype.rotate = function (rotation) {
	this.body.angularVelocity = (.5 - rotation) * shipProps.angularVelocity;
}

Ship.prototype.death = function () {
	// animate
	this.kill();
};

Ship.prototype.sendKeyNoRotation = function () {
	// use keys here to avoid multiple sends by comparing to state
	if (this.keys.r || this.keys.l) {
		this.keys.r = false;
		this.keys.l = false;
		this.app.sendKeyChange();
	}
}

Ship.prototype.sendKeyLeft = function () {
	if (!this.keys.l) {
		this.keys.r = false;
		this.keys.l = true;
		this.app.sendKeyChange();
	}
}

Ship.prototype.sendKeyRight = function () {
	if (!this.keys.r) {
		this.keys.r = true;
		this.keys.l = false;
		this.app.sendKeyChange();
	}
}

Ship.prototype.sendKeyUpActive = function (isDown) {
	if (!this.keys.u) {
		this.keys.u = true;
		this.app.sendKeyChange();
	}
}

Ship.prototype.sendKeyUpInactive = function () {
	if (this.keys.u) {
		this.keys.u = false;
		this.app.sendKeyChange();
	}
}

Ship.prototype.recvKeyChange = function (keys) {
	this.keys = keys;
	this.state.k = keys;
}

Ship.prototype.shareSelf = function () {
	return {
		i: this.state.i,
		p: {
			x: this.x,
			y: this.y,
			a: this.angle
		},
		v: { // velocity
			x: this.body.velocity.x,
			y: this.body.velocity.y,
			a: this.body.angularVelocity // cut this data size down by making it 1, 0, or -1
		},
		a: {
			x: this.body.acceleration.x, // acceleration
			y: this.body.acceleration.y
		},
		h: 100, // health this.health (Health is a Phaser property)
		k: { // keys
			u: this.state.k.u, // up
			l: this.state.k.l, // left
			r: this.state.k.r // right
		}
	};
}

Ship.prototype.getState = function () {
	return {
		i: this.state.i,
		p: {
			x: this.x,
			y: this.y,
			a: this.angle
		},
		v: { // velocity
			x: this.body.velocity.x,
			y: this.body.velocity.y
		},
		h: 100
	};
}

Ship.prototype.recvStateUpdate = function (data) {
	this.x = data.p.x;
	this.y = data.p.y;
	this.angle = data.p.a;
	this.body.velocity.x = data.v.x;
	this.body.velocity.y = data.v.y;
}

Ship.prototype.reload = function () {
	var self = this;
	this.interval = setTimeout(function () {
		self.fireable = true;
	}, bulletProps.interval);

}

Ship.prototype.sendFire = function () {
	if (!this.fireable)
		return;
	this.fireable = false;
	this.reload();

	let x = this.body.x + this.body.halfWidth;
	let y = this.body.y + this.body.halfHeight;
	this.app.sendFire({
		i: this.state.i,
		p: {
			x: x,
			y: y,
			a: Math.radians(this.body.rotation)
		}
	});
}


export { Ship };