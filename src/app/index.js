'use strict';

angular.module('circlr', ['ngRoute', 'ngMaterial', 'crCirclr'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/image', {
        templateUrl: 'app/image/image.html',
        controller: 'ImageCtrl'
      })
      .when('/player', {
        templateUrl: 'app/player/player.html',
        controller: 'PlayerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
