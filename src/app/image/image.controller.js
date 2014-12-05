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
    var computeSection = function (imgdata, x1, y1, x2, y2) {
      return 50;  // TODO: Do some actual computing
    };

    $scope.analyse = function (imgdata) {
      var pl = {
        orgWidth: imgdata.width,
        orgHeight: imgdata.height,
        points: []
      };

      var xSpans = divideDimension(pl.orgWidth, settings.resolution);
      var ySpans = divideDimension(pl.orgHeight, settings.resolution);
      $log.debug('analyse xSpans', xSpans, 'ySpans', ySpans);

      var sx, sy;
      for (var x = 0, y = 0; y < ySpans.length; x = (++x == xSpans.length) ? 0 : x, y = (x == 0) ? y + 1: y) {
        sx = xSpans[x];
        sy = ySpans[y];
        pl.points.push({ x: x, y: y, val: computeSection(imgdata, sx.start, sy.start, sx.end, sy.end) });
      }
      $log.debug('analyse final:', pl);
    };
  });
