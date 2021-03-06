'use strict';

angular.module('crCirclr')
  .service('circlr', function (d3) {
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

      var hsl = d3.rgb(ar, ag, ab).hsl();

      return { h: hsl.h, s: hsl.s, l: hsl.l, color: hsl.toString() }; //(ar + ag + ab) / 3 / 255;
    };

    this.resolution = function (w, h, maxCircles) {
      return Math.ceil(Math.sqrt(w * h / maxCircles));
    };
    this.analyse = function (imgdata, settings) {
      var pl = {
        orgWidth: imgdata.width,
        orgHeight: imgdata.height,
        points: [],
        settings: angular.copy(settings)
      };

      var xSpans = divideDimension(pl.orgWidth, pl.settings.resolution);
      var ySpans = divideDimension(pl.orgHeight, pl.settings.resolution);
      pl.columns = xSpans.length;
      pl.rows = ySpans.length;

      var sx, sy, point;
      for (var x = 0, y = 0; y < ySpans.length; x = (++x === xSpans.length) ? 0 : x, y = (x === 0) ? y + 1: y) {
        sx = xSpans[x];
        sy = ySpans[y];
        point = angular.extend({ x: x, y: y }, computeSection(imgdata, sx.start, sy.start, sx.end, sy.end));
        if (point.l > pl.settings.cutoff)
          pl.points.push(point);
      }
      return pl;
    };
  });
