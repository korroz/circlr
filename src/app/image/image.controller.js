'use strict';

angular.module('circlr')
  .controller('ImageCtrl', function ($scope, $log) {
    var settings = $scope.settings = {
      circles: 5000,
      cutoff: 0.16
    };
    var latestImg;
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

      for (var x = x1, y = y1; y <= y2; x = (++x === x2) ? x1 : x, y = (x === x1) ? y + 1: y) {
        i = (x * 4) + (y * imgdata.width * 4);
        ar += d[i + 0];
        ag += d[i + 1];
        ab += d[i + 2];
        count++;
      }

      ar /= count;
      ag /= count;
      ab /= count;

      //l = d3.rgb(ar, ag, ab).hsl().l;

      return (ar + ag + ab) / 3 / 255;
    };

    $scope.imageUrl = 'http://media3.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/_archive/Entertainment/_Celebrity%20Slideshows/N-S/Pitt-Brad-090717/ss-131015-pitt-tease-01.blocks_desktop_medium.jpg';

    $scope.analyse = function (imgdata) {
      latestImg = imgdata;
      var pl = {
        orgWidth: imgdata.width,
        orgHeight: imgdata.height,
        points: [],
        settings: angular.copy(settings)
      };
      pl.resolution = Math.ceil(Math.sqrt(pl.orgWidth * pl.orgHeight / settings.circles));

      var xSpans = divideDimension(pl.orgWidth, pl.resolution);
      var ySpans = divideDimension(pl.orgHeight, pl.resolution);
      pl.columns = xSpans.length;
      pl.rows = ySpans.length;

      var sx, sy;
      for (var x = 0, y = 0; y < ySpans.length; x = (++x === xSpans.length) ? 0 : x, y = (x === 0) ? y + 1: y) {
        sx = xSpans[x];
        sy = ySpans[y];
        pl.points.push({ x: x, y: y, val: computeSection(imgdata, sx.start, sy.start, sx.end, sy.end) });
      }
      $log.debug('analyse final:', pl);
      $scope.payload = pl;
    };

    $scope.$watch('settings', function () {
      if (settings && latestImg)
        $scope.analyse(latestImg);
    }, true);
  });
