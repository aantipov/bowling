// This file is an entry point for angular tests
import 'angular';
import 'angular-mocks/angular-mocks';

const context = require.context('./', true, /\.js$/);

context.keys().forEach(context);
