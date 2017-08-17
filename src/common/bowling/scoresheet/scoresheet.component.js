import templateUrl from './scoresheet.html';

export const ScoresheetComponent = {
  templateUrl,
  bindings: {
    players: '<',
  },
  controller: class ScoresheetController {
    constructor() {
      this.framesIndices = Array.from({ length: 10 }, (v, k) => k + 1);
    }

    getRoll1Pins(player, frameIndex) {
      const frame = player.getFrames()[frameIndex];
      return !frame || frame.roll1pins === null ? '-' : frame.roll1pins;
    }

    getRoll2Pins(player, frameIndex) {
      const frame = player.getFrames()[frameIndex];
      return !frame || frame.roll2pins === null ? '-' : frame.roll2pins;
    }

    getScore(player, frameIndex) {
      const frame = player.getFrames()[frameIndex];
      return frame ? frame.score : '-';
    }
  },
};

ScoresheetComponent.$inject = [];
