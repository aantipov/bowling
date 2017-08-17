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
  let lastFrame = null;

  this.getName = () => name;

  this.getFrames = () => frames;

  this.getLastFrame = () => lastFrame;

  this.roll = () => {
    // Create a frame in case it is the first roll or
    // the last frame is finished
    if (!lastFrame || lastFrame.isFinished) {
      lastFrame = new Frame();
      frames.push(lastFrame);
    }

    // Calc number of pins, available for the roll
    const pins = lastFrame.roll1pins === null ? 10 : 10 - lastFrame.roll1pins;
    // Calc number of pins, knocked down in the roll
    const pinsKnockedDown = Math.floor(Math.random() * (pins + 1));

    if (lastFrame.roll1pins === null) {
      Object.assign(lastFrame, {
        roll1pins: pinsKnockedDown,
        score: pinsKnockedDown,
        isStrike: pinsKnockedDown === 10,
        isFinished: pinsKnockedDown === 10,
      });
    } else {
      Object.assign(lastFrame, {
        roll2pins: pinsKnockedDown,
        score: lastFrame.roll1pins + lastFrame.roll2pins,
        isSpare: lastFrame.score === 10,
        isFinished: true,
      });
    }
  };
}
