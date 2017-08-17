function Frame() {
  this.roll1pins = null;
  this.roll2pins = null;
  this.isStrike = false;
  this.isSpare = false;
  this.isFinished = false;
  this.score = 0;
}

export default function Player(name) {
  const frames = [];
  let currentFrame = null;
  let previousFrame = null;
  let gameOver = false;
  let totalScore = 0;

  this.getName = () => name;

  this.getFrames = () => frames;

  this.getCurrentFrame = () => currentFrame;

  this.getTotalScore = () => totalScore;

  this.isGameOver = () => gameOver;

  this.roll = () => {
    // Create a frame in case it is the first roll or
    // the last frame is finished
    if (!currentFrame || currentFrame.isFinished) {
      currentFrame = new Frame();
      frames.push(currentFrame);
    }

    if (frames.length > 1) {
      previousFrame = frames[frames.length - 2];
    }

    // Calc number of pins, available for the roll
    const pins =
      currentFrame.roll1pins === null ? 10 : 10 - currentFrame.roll1pins;
    // Calc number of pins, knocked down in the roll
    const pinsKnockedDown = Math.floor(Math.random() * (pins + 1));

    if (currentFrame.roll1pins === null) {
      Object.assign(currentFrame, {
        roll1pins: pinsKnockedDown,
        score: pinsKnockedDown,
        isStrike: pinsKnockedDown === 10,
        isFinished: pinsKnockedDown === 10,
      });
    } else {
      Object.assign(currentFrame, {
        roll2pins: pinsKnockedDown,
        score: currentFrame.roll1pins + pinsKnockedDown,
        isSpare: currentFrame.roll1pins + pinsKnockedDown === 10,
        isFinished: true,
      });
    }

    // Calc additional scores for previous strikes and spares
    if (previousFrame) {
      if (previousFrame.isStrike) {
        previousFrame.score =
          previousFrame.roll1pins +
          previousFrame.roll2pins +
          currentFrame.score;
      } else if (previousFrame.isSpare) {
        previousFrame.score =
          previousFrame.roll1pins +
          previousFrame.roll2pins +
          currentFrame.roll1pins;
      }
    }

    // Calc gameOver prop
    if (frames.length >= 10) {
      if (
        (!frames[9].isStrike && !frames[9].isSpare && frames[9].isFinished) ||
        (frames[9].isStrike && frames[10] && frames[10].isFinished) ||
        (frames[9].isSpare && frames[10] && frames[10].roll1pins !== null)
      ) {
        gameOver = true;
      }
    }

    totalScore = frames.reduce((total, frame) => total + frame.score, 0);
  };
}
