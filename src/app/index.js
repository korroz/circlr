'use strict';

angular.module('circlr', ['ngRoute', 'ngMaterial'])
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
      .otherwise({
        redirectTo: '/'
      });
  })
;
