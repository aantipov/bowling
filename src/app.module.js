import angular from 'angular';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';
import 'bulma/css/bulma.css';
import './style.scss';

/**
 * The application is constructed with angularjs-styleguide in mind
 * https://github.com/toddmotto/angularjs-styleguide
 *
 * Main AppModule module depends on two modules:
 * - ComponentsModule, containing all reusable components
 * - CommonModule, containing all application specific components
 */
export const AppModule = angular
  .module('app', [ComponentsModule, CommonModule])
  .component('app', AppComponent).name;
