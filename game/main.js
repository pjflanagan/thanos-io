import { Game } from './modules/game.js'

/**
 * @constant
 */
const DIMS = {
	W: 1800,
	H: 1200
};
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
	var game = new Phaser.Game(
		DIMS.W,
		DIMS.H,
		Phaser.AUTO,
		'',
		new Game()
	);
};

