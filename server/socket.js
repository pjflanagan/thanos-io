class ServerSocket {
	constructor(io) {
		this.io = io;
		this.io.on('connection', (socket) => {
			let self = this;
			self.newConnection(socket);

			socket.on('key', function (data) {
				io.emit('key', data);
			});

			socket.on('disconnect', function () {
				self.removeConnection(socket);
			});
		});
	}

	newConnection(socket) {
		console.log('Add User:', socket.id);
		this.io.to(`${socket.id}`).emit('welcome', socket.id);
	}

	removeConnection(socket) {
		console.log('Remove User:', socket.id);
	}
}

export { ServerSocket }