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
});
