// I don't think you need to save every user's state, just the fact
// that they exist

import { defaultUser } from '../shared/const.js'

class Room {
  constructor(server){
    this.server = server;
    this.users = [];
  }

  // size - size of room
  // high scores - high scores of the room

  connection(socket){
    const userID = socket.id;
    const user = defaultUser(userID);
    this.users.push(userID);
    this.server.sendConnection(socket, user);
  }

  disconnect(socket){
    this.users = this.users.filter((userID) => {
      return userID !== socket.id;
    });
    this.server.sendDisconnect(socket);
  }
}

export { Room };