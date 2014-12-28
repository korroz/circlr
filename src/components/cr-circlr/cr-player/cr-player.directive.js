'use strict';

angular.module('crCirclr')
  .directive('crPlayer', function (d3, $timeout, $window, $log) {
    return {
      restrict: 'E',
      //templateUrl: 'components/cr-circlr/cr-player/cr-player.html',
      template: '<svg width="800" height="600"></svg>',
      scope: {},
      controller: function ($scope) {
        $scope.series = $window.JSON.parse($window.localStorage.getItem('circlrSeries'));
      },
      link: function (scope, el) {
        var svg = d3.select(el[0].firstElementChild);

        var fireFrame = function (payload, index) {
          $timeout(function () {
            $log.debug('cr-player playing frame', payload);
            var pl = payload;
            var hc = pl.columns / 2, hr = pl.rows / 2;

            svg.transition().attr('viewBox', '' + (-hc) + ' ' + (-hr) + ' ' + pl.columns + ' ' + pl.rows);

            var c = svg.selectAll('circle').data(pl.points.filter(function (p) { return p.l > pl.settings.cutoff; }));

            c.enter().append('circle')
              .attr('cx', function () { return Math.random() * pl.columns - hc; })
              .attr('cy', function () { return Math.random() * pl.rows - hr; })
              .attr('r', 0);

            c.transition().delay(250).duration(2000)
              .attr('cx', function (d) { return d.x + 0.5 - hc; })
              .attr('cy', function (d) { return d.y + 0.5 - hr; })
              .attr('fill', function (d) { return d.color; })
              .attr('r', function (d) { return d.l * 0.7; });

            c.exit().transition().duration(2000)
              .attr('r', 0)
              .remove();
          }, 5000 * index, false);
        };

        for (var i = 0; i < scope.series.length; i++) {
          fireFrame(scope.series[i], i);
        }
      }
    };
  });
