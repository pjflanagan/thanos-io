import { ClientSocket } from './socket.js'
import { Game } from '../game/game.js'

/** 
 * @class ClientGame @extends Game
 */
class ClientGame extends Game {
	constructor() {
		super();
		this.socket = new ClientSocket(this);
	}

}

export { ClientGame };