import { Game } from './game/game.js';

/**
 * @event onload
 */
window.onload = function () {
	var game = new Phaser.Game(
		1200, // DIMS.W,
		800, // DIMS.H,
		Phaser.AUTO,
		'',
		new Game()
	);
};