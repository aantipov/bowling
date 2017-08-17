import angular from 'angular';
import { BowlingModule } from './bowling.module';
const { module, inject } = angular.mock;

describe('<bowling> component', () => {
  let ctrl;

  beforeEach(module(BowlingModule));

  beforeEach(
    inject(_$componentController_ => {
      ctrl = _$componentController_('bowling', null, {});
    })
  );

  describe('::$onInit()', () => {
    beforeEach(() => {
      ctrl.$onInit();
    });

    it('should define isGameStarted prop', () => {
      expect(ctrl.isGameStarted).toBe(false);
    });

    it('should define isGameFinished prop', () => {
      expect(ctrl.isGameFinished).toBe(false);
    });

    it('should define players prop', () => {
      expect(ctrl.players).toEqual([]);
    });

    it('should define current player prop', () => {
      expect(ctrl.player).toBeNull();
    });

    it('should define current frame prop', () => {
      expect(ctrl.frame).toBe(1);
    });
  });

  describe('::addPlayer()', () => {
    it('should be defined', () => {
      expect(typeof ctrl.addPlayer).toBe('function');
    });
  });

  describe('::start()', () => {
    it('should be defined', () => {
      expect(typeof ctrl.start).toBe('function');
    });
  });

  describe('::doRoll()', () => {
    it('should be defined', () => {
      expect(typeof ctrl.doRoll).toBe('function');
    });
  });
});
