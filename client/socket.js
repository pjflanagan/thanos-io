class ClientSocket {
	constructor(app) {
		this.socket = io();
    this.app = app; 
    const self = this;

		this.socket.on('addSelf', (data) => self.addSelf(data));
    this.socket.on('addUser', (data) => self.addUser(data))
    this.socket.on('addNewUser', (data) => {
      self.addUser(data);
      self.shareSelf(data);
    });

    this.socket.on('death', (data) => self.removeUser(data));

    this.socket.on('keyChange', (data) => self.recvKeyChange(data));
  }

  addSelf(data){
    // console.log('addSelf:', data);
    this.app.addSelf(data);
  }
  
  addUser(data){
    // console.log("addUser:", data);
    this.app.addUser(data);
  }

  shareSelf(data){
    this.socket.emit('shareSelf', {
      to: data.i,
      user: this.app.shareSelf() 
    }); 
  }

  sendKeyChange(data){
    // console.log('sendKeyChange:', data);
    this.socket.emit('keyChange', data);
  }

  recvKeyChange(data){
    // console.log('recvKeyChange:', data);
    // this.app.recvKeyChange(data);
  }

  removeUser(userID){ 
    // right now data is just the user id but 
    // it should also have who killed them to keep score
    // console.log("removeUser:", data);
    this.app.removeUser(userID);
  }

	
}

export { ClientSocket };