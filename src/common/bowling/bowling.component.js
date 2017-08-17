import templateUrl from './bowling.html';

export const BowlingComponent = {
  templateUrl,
  controller: class ComponentController {
    constructor() {}

    $onInit() {
      this.isGameStarted = false;
      this.isGameFinished = false;
      this.players = [];
      this.player = null;
      this.frame = 1;
      this.roll = 1;
    }

    addPlayer() {}

    start() {}

    doRoll() {}
  },
};

BowlingComponent.$inject = [];
