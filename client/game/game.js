import { Ship } from './sprites/ship.js';
// import { Bullet } from './sprites/bullet.js'
import { ClientSocket } from '../socket.js'

class Game {
  constructor() {
		this.socket = new ClientSocket(this);
  }

	preload() {
    this.game.load.spritesheet('imgShip', './assets/img_ship.png', 36, 36, 20);
		this.game.load.spritesheet('imgBullet', './assets/img_bullet.png', 18, 18, 3);	
	}

	create() {
    // set scale mode to cover the entire screen
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		this.game.stage.backgroundColor = "#1C1C1C"; // set a black color for the background of the stage
		this.game.stage.disableVisibilityChange = true; // keep game running if it loses the focus
		
		// create a new Genetic Algorithm with a population of 10 units which will be evolving by using 4 top units
		this.bulletGroup = this.game.add.group(); // create a BulletGroup which contians the bullets
    this.shipGroup = this.game.add.group(); // create a ShipGroup which contains a number of Ship objects
    
    // create keys for a human to play
		this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.keyThrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.keyFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.physics.startSystem(Phaser.Physics.ARCADE); // start the Phaser arcade physics engine
  }
  
	update() {
    // update location of all ships
    // update location of all bullet
    // update this state and report to server if necessary
  }

  connection(data){
    this.spawn(data);
  }
  
  spawn(data){
    // this.shipGroup.append(new Ship(data));
    // share this current location to server when a new 
    // ship is added so it knows where you are
  }

  kill(userID){
    // this.shipGroup.remove(userID);
  }
};

export { Game, Ship };