'use strict';

angular.module('ngD3', [])
  .factory('d3', function ($window) { return $window.d3; });
angular.module('crCirclr', ['ngD3']);
