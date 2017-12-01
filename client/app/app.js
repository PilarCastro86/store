'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import main from './main/main.component';

import './app.scss';

angular.module('bibliotecaApp', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, navbar,
 main
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bibliotecaApp'], {
      strictDi: true
    });
  });
