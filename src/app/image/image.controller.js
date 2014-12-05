'use strict';

angular.module('circlr')
  .controller('ImageCtrl', function ($scope, $log) {
    var settings = {
      resolution: 16
    };
    var divideDimension = function (dimension, resolution) {
      dimension -= 1; // make it index based
      var sections = [];
      for (var i = 0, end = resolution - 1; i < dimension; i += resolution, end += resolution)
        sections.push({ start: i, end: end > dimension ? dimension : end });
      return sections;
    };
    var computeSection = function (imgdata, x1, y1, x2, y2) {
      var ar, ag, ab, count, d = imgdata.data, i;
      ar = ag = ab = count = 0;

      for (var x = x1, y = y1; y <= y2; x = (++x == x2) ? x1 : x, y = (x == x1) ? y + 1: y) {
        i = (x * 4) + (y * imgdata.width * 4);
        ar += d[i + 0];
        ag += d[i + 1];
        ab += d[i + 2];
        count++;
      }

      ar /= count;
      ag /= count;
      ab /= count;

      return (ar + ag + ab) / 3 / 255;
    };

    $scope.imageUrl = 'http://media3.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/_archive/Entertainment/_Celebrity%20Slideshows/N-S/Pitt-Brad-090717/ss-131015-pitt-tease-01.blocks_desktop_medium.jpg';

    $scope.analyse = function (imgdata) {
      var pl = {
        orgWidth: imgdata.width,
        orgHeight: imgdata.height,
        resolution: settings.resolution,
        points: []
      };

      var xSpans = divideDimension(pl.orgWidth, settings.resolution);
      var ySpans = divideDimension(pl.orgHeight, settings.resolution);
      $log.debug('analyse xSpans', xSpans, 'ySpans', ySpans);
      pl.columns = xSpans.length;
      pl.rows = ySpans.length;

      var sx, sy;
      for (var x = 0, y = 0; y < ySpans.length; x = (++x == xSpans.length) ? 0 : x, y = (x == 0) ? y + 1: y) {
        sx = xSpans[x];
        sy = ySpans[y];
        pl.points.push({ x: x, y: y, val: computeSection(imgdata, sx.start, sy.start, sx.end, sy.end) });
      }
      $log.debug('analyse final:', pl);
      $scope.payload = pl;
    };
  });
