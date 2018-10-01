import { Socket } from './socket.js'

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