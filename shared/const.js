/**
 * @constant
 */
const DIMS = {
	W: 1800,
	H: 1200
};
const STATE = {
	INIT: 0,
	START: 1,
	PLAY: 2,
	GAMEOVER: 3
};
const GAME = {
  STONES: ["POWER", "SPACE", "REALITY", "SOUL", "TIME", "MIND"],
	MAX_SHIPS: 30
};

const defaultUser = function(userID){
  return {
    i: userID, // id
    p: { // position
      x: Math.random() * 1000,
      y: Math.random() *  800,
      a: Math.random() // angle
    },
    v: { // velocity
      x: 0, 
      y: 0,
      a: 0
    },
    a: 0, // acceleration
    h: 100, // health
    k: { // keys
      u: false, // up
      l: false, // left
      r: false // right
    }
  }
}

export { defaultUser };