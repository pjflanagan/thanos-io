import { ClientSocket } from './socket.js';
import { Ship } from './sprites/ship.js';
import { Bullet } from './sprites/bullet.js';
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

App.Main = function (game) { }

App.Main.prototype = {

	// overrides

	preload: function () {
		this.game.load.spritesheet(
			'imgShip',
			'/client/assets/img_ship.png',
			100, 100, 2
		);
		this.game.load.spritesheet(
			'imgBullet',
			'/client/assets/img_bullet.png',
			18, 18, 3
		);

		this.game.load.image('bg', '/client/assets/img_bg.png');
	},

	create: function () {
		this.game.world.setBounds(0, 0, GAME.WORLD.WIDTH, GAME.WORLD.HEIGHT);
		this.game.add.tileSprite(0, 0, GAME.WORLD.WIDTH, GAME.WORLD.HEIGHT, 'bg');
		this.game.stage.disableVisibilityChange = true; // keep game running if it loses the focus
		this.game.physics.startSystem(Phaser.Physics.ARCADE); // start the Phaser arcade physics engine

		this.BulletGroup = this.game.add.group();
		this.ShipGroup = this.game.add.group();

		this.socket = new ClientSocket(this);

		this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.keyThrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.keyFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function () {
		this.ShipGroup.forEach(function (ship) {
			ship.update();
		});
		this.userInput();
	},

	// input

	userInput: function () {
		if (!this.self) return;

		if (this.keyLeft.isDown === this.keyRight.isDown) this.self.sendKeyNoRotation();
		else if (this.keyLeft.isDown) this.self.sendKeyLeft();
		else this.self.sendKeyRight();

		if (this.keyThrust.isDown) this.self.sendKeyUpActive();
		else this.self.sendKeyUpInactive();

		if (this.keyFire.isDown) this.self.sendFire();
	},

	// socket functions

	addSelf: function (data) {
		this.self = new Ship(this, this.game, data);
		this.ShipGroup.add(this.self);
		this.game.camera.follow(this.self);
	},

	shareSelf: function () {
		return this.self.shareSelf();
	},

	addUser: function (data) {
		this.ShipGroup.add(new Ship(this, this.game, data));
	},

	removeUser: function (userID) {
		this.ShipGroup.forEach((ship) => {
			if (ship.state.i === userID)
				ship.death();
		});
	},

	sendKeyChange: function () {
		this.socket.sendKeyChange({
			i: this.self.state.i,
			k: this.self.keys
		});
	},

	recvKeyChange: function (data) {
		this.ShipGroup.forEach(function (ship) {
			if (ship.state.i === data.i) {
				ship.recvKeyChange(data.k);
			}
		});
	},

	sendStateUpdate: function () {
		this.socket.sendStateUpdate(this.self.getState());
	},

	recvStateUpdate: function (data) {
		this.ShipGroup.forEach(function (ship) {
			if (ship.state.i === data.i) {
				ship.recvStateUpdate(data);
			}
		})
	},

	sendFire: function (data) {
		this.socket.sendFire(data);
	},

	recvFire: function (data) {
		this.BulletGroup.add(new Bullet(this, this.game, data));
	}

};