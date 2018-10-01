class Socket {
	constructor(game) {
		this.socket = io();
		this.game = game;

		this.socket.on('event', function () {
			game.do();
		});

		this.socket.on('welcome', function (data) {
			console.log(data);
		})
	}

	emit(event, value) {
		// do some sizing changes here
		this.socket.emit(event, value);
	}
}

export { Socket };