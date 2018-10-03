// I don't think you need to save every user's state, just the fact
// that they exist

import { defaultUserState } from '../shared/const.js'

class Room {
  constructor(server){
    this.server = server;
    this.userStates = {};
    this.interval = setInterval(() => this.reportState(), 10);
  }

  // size - size of room
  // high scores - high scores of the room

  connection(socket){
    const userState = defaultUserState(socket.id);
    this.userStates[userState.i] = userState;
    this.server.sendConnection(socket, userState);
  }

  disconnect(socket){
    delete this.userStates[socket.id]
    this.server.sendDisconnect(socket);
  }

  updateState(data){
    this.userState[data.id] = data;
  }

  reportState(){
    this.server.reportState(this.userStates);
  }
}

export { Room };