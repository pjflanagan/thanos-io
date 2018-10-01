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
      self.shareSelf();
    });
  }

  addSelf(data){
    console.log('addSelf:', data);
    // this.game.addSelf
  }
  
  addUser(data){
    console.log("addUser:", data);
    // this.game.addUser(data);
  }

  shareSelf(){
    this.socket.emit('shareSelf', this.game.shareSelf());
  }

	
}

export { ClientSocket };