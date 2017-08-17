import templateUrl from './playground.html';

export const PlaygroundComponent = {
  templateUrl,
  bindings: {
    isGameStarted: '<',
    isGameFinished: '<',
    players: '<',
    player: '<',
    frame: '<',
    addPlayer: '<',
    start: '<',
    doRoll: '<',
  },
  controller: class PlaygroundController {
    $onInit() {
      this.playerName = null;
    }

    addNewPlayer() {
      if (!this.playerName) {
        return;
      }

      this.addPlayer(this.playerName);
      this.playerName = null;
    }
  },
};

PlaygroundComponent.$inject = [];
