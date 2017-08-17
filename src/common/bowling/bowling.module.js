import angular from 'angular';
import { BowlingComponent } from './bowling.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ScoresheetComponent } from './scoresheet/scoresheet.component';
import './bowling.scss';

export const BowlingModule = angular
  .module('Bowling', [])
  .component('bowling', BowlingComponent)
  .component('playground', PlaygroundComponent)
  .component('scoresheet', ScoresheetComponent).name;
