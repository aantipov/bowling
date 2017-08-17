import angular from 'angular';
import { BowlingModule } from './bowling/bowling.module';

/**
 * Define a module, containing all application specific components.
 */
export const CommonModule = angular.module('app.common', [BowlingModule]).name;
