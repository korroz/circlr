'use strict';

angular.module('circlr')
  .controller('ImageCtrl', function ($scope, $log) {
    var settings = {
      resolution: 100
    };
    var divideDimension = function (dimension, resolution) {
      dimension -= 1; // make it index based
      var sections = [];
      for (var i = 0, end = resolution - 1; i < dimension; i += resolution, end += resolution)
        sections.push({ start: i, end: end > dimension ? dimension : end });
      return sections;
    };

    $scope.analyse = function (imgdata) {
      var pl = {
        orgWidth: imgdata.width,
        orgHeight: imgdata.height,
        points: []
      };

      var xSpans = divideDimension(pl.orgWidth, settings.resolution);
      var ySpans = divideDimension(pl.orgHeight, settings.resolution);
      $log.log('analyse xSpans', xSpans, 'ySpans', ySpans);
    };
  });
