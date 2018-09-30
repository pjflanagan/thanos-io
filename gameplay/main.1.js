import { Ship } from './modules/ship.js';
import { Socket } from './modules/socket.js'

/**
 * @constant
 */

var W = 1800;
var H = 1400;
var CENTER_X = W / 2,
	CENTER_Y = H / 2,
	D = Math.sqrt(W * W + H * H);
const STATE = {
	INIT: 0,
	START: 1,
	PLAY: 2,
	GAMEOVER: 3
};

/**
 * @event onload
 */

window.onload = function () {
	// playerStats.playing = gup("player");
	var game = new Phaser.Game(W, H, Phaser.CANVAS, 'game');
	game.state.add('Main', App.Main);
	game.state.start('Main');
};

/**
 * Main Program
 */

var App = {};

App.Main = function (game) { }

App.Main.prototype = {
	/**
	 * @method preload
	 */
	preload: function () {
		this.game.load.spritesheet('imgShip', 'assets/img_ship.png', 36, 36, 20);
		// this.game.load.spritesheet('imgBullet', 'assets/img_bullet.png', 18, 18, 3);
	},

	/**
	 * @method create
	 */
	create: function () {
		// set scale mode to cover the entire screen
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		this.game.stage.backgroundColor = "#1C1C1C"; // set a black color for the background of the stage
		this.game.stage.disableVisibilityChange = true; // keep game running if it loses the focus
		this.game.physics.startSystem(Phaser.Physics.ARCADE); // start the Phaser arcade physics engine

		this.BulletGroup = this.game.add.group(); // create a BulletGroup which contians the bullets
		this.ShipGroup = this.game.add.group(); // create a ShipGroup which contains a number of Ship objects
		// TODO: user join this.ShipGroup.add(new Ship(this.game, CENTER_X, CENTER_Y, i, this.BulletGroup));

		// create keys for a human to play
		this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.keyThrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.keyFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// set initial App state
		this.state = STATE.INIT;
	},

	/**
	 * @method update
	 */
	update: function () {
		switch (this.state) {
			case STATE.INIT:
				this.state = STATE.START;
				break;

			case STATE.START:


				this.state = STATE.PLAY;
				break;

			case STATE.PLAY:
				// this.BulletGroup.forEachExists(function (bullet) { this.checkBoundaries(bullet); }, this);
				// this.game.physics.arcade.overlap(this.BulletGroup, this.ship, this.bulletHit, null, this);


				break;

			case STATE.GAMEOVER:
				this.BulletGroup.removeAll();
				this.state = STATE.START;
				break;
		}
	},

	/**
	 * @method userMovement
	 */
	userMovement: function (ship) {
		if (this.keyLeft.isDown) {
			ship.rotate(1);
		}
		else if (this.keyRight.isDown) {
			ship.rotate(0);
		}
		else {
			ship.rotate(.5);
		}

		if (this.keyThrust.isDown) {
			ship.gas();
		}
		else {
			ship.gasOff();
		}

		if (this.keyFire.isDown) {
			ship.shoot();
		}
	},

	/**
	 * @method onDeath
	 */
	onDeath: function (ship) {
		ship.death();
	}

}







