import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig from './on_config';
import onRun from './on_run';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-sanitize';
import './templates';
import './controllers';
import './directives/ngEdict.js';

// create and bootstrap application
const requires = [
    'ui.router',
    'templates',
    'ngAnimate',
    'ngSanitize',
    'app.controllers',
    'ngEdict'
];

/**
* @ngdoc overview
* @name app
* @description Main module containing all sub-modules
*/

window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
    strictDi: true
});
