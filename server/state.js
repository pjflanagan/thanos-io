// I don't think you need to save every user's state, just the fact
// that they exist

import { defaultUser } from '../shared/const.js'

class State {
  constructor(server){
    this.server = server;
    this.users = [];
  }

  connection(socket){
    const userID = socket.id;
    const user = defaultUser(userID);
    this.users.push(userID);
    this.server.sendConnection(socket, user);
  }

  disconnect(socket){
    // this.users.remove user userID
    this.server.sendDisconnect(socket);
  }
}

export { State };