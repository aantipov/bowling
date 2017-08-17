import Player from './Player';

describe('Player', () => {
  let player;
  beforeEach(() => {
    player = new Player('Artem');
  });

  it('::getName() should be defined', () => {
    expect(player.getName()).toBe('Artem');
  });

  it('::getFrames() should be defined', () => {
    expect(typeof player.getFrames).toBe('function');
  });

  it('::getLastFrame() should be defined', () => {
    expect(typeof player.getLastFrame).toBe('function');
  });

  it('::roll() should be defined', () => {
    expect(typeof player.roll).toBe('function');
  });
});
