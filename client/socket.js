class ClientSocket {
	constructor(game) {
		this.socket = io();
    this.game = game;
    const self = this;

		this.socket.on('addSelf', function (data) {
			self.addSelf(data);
    });
    
    this.socket.on('addUser', function(data){
      self.addUser(data);
    })

    this.socket.on('addNewUser', function(data){
      self.addUser(data);
      self.shareSelf(data);
    });

    this.socket.on('removeUser', function(data){
      self.removeUser(data);
    })
  }

  addSelf(data){
    console.log('addSelf:', data);
    this.game.addSelf(data);
  }
  
  addUser(data){
    console.log("addUser:", data);
    // this.game.addUser(data);
  }

  shareSelf(data){
    this.socket.emit('shareSelf', {
      to: data.i,
      user: { hey: 'me' } // this.game.shareSelf());
    }); 
  }

  removeUser(data){
    console.log("removeUser:", data);
    // this.game.removeUser(data);
  }

	
}

export { ClientSocket };