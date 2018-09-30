class Socket {
	constructor(game) {
		this.socket = io();
		this.game = game;

		this.socket.on('event', function () {
			game.do();
		});
	}

	emit(event, value) {
		// do some sizing changes here
		this.socket.emit(event, value);
	}
}

export { Socket };