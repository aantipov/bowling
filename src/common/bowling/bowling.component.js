import templateUrl from './bowling.html';
import Player from './Player';

export const BowlingComponent = {
  templateUrl,
  controller: class BowlingController {
    constructor() {
      this.addPlayer = this.addPlayer.bind(this);
      this.start = this.start.bind(this);
      this.doRoll = this.doRoll.bind(this);
    }

    $onInit() {
      this.isGameStarted = false;
      this.isGameFinished = false;
      this.players = [];
      this.player = null;
      this.frame = 1;
    }

    addPlayer(name) {
      this.players.push(new Player(name));
    }

    start() {
      this.player = this.players[0];
      this.isGameStarted = true;
    }

    doRoll() {
      const { player, players } = this;
      const playerIndex = players.indexOf(player);

      !player.isGameOver() && player.roll();

      // If the frame is finished for the player
      if (player.getCurrentFrame().isFinished) {
        // If it is the last user
        if (playerIndex === players.length - 1) {
          this.player = players[0]; // Switch to the first player
          this.frame++; // Increment the frame and switch to the first player
        } else {
          this.player = players[playerIndex + 1]; // Switch to the next player
        }
      }

      this.isGameFinished = this._isGameOver();
    }

    reset() {
      this.$onInit();
    }

    _isGameOver() {
      if (this.frame < 10) {
        return false;
      }

      return this.players.every(player => player.isGameOver());
    }
  },
};

BowlingComponent.$inject = [];
