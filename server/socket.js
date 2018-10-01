import { State } from './state.js'
// https://socket.io/docs/emit-cheatsheet/

class ServerSocket {
	constructor(io) {
    this.addState(new State(this)); // this will allow us to make multiple rooms

    this.io = io;
		this.io.on('connection', (socket) => {
			const self = this;
			self.recvConnection(socket);

			socket.on('disconnect', function () {
				self.recvDisconnect(socket);
      });
      
      socket.on('shareSelf', function(data) {
        self.recvShareSelf(socket, data);
      })
		});
  }
  
  addState(state){
    // server socket should have multiple games this.rooms.push(room)
    this.state = state;
  }

  // connection
	recvConnection(socket) {
    console.log('recvConnection:', socket.id);
    this.state.connection(socket);
  }
  
  sendConnection(socket, user) {
    socket.broadcast.emit('addNewUser', user);
    socket.to(`${user.i}`).emit('addSelf', user);
  }

  // disconnect
	recvDisconnect(socket) {
    console.log('recvDisconnect:', socket.id);
    this.state.recvDisconnect(socket);
  }
  
  sendDisconnect(socket) {
    this.sendDeath(socket);
  }

  // death
  sendDeath(socket){
    socket.emit('death', socket.id);
  }

  // share self
  recvShareSelf(socket, data){
    this.sendShareSelf(socket, data);
  }

  sendShareSelf(socket, data){
    socket.to(`${data.to}`).emit('addUser', data);
  }
}

export { ServerSocket }