'use strict';

angular.module('crCirclr')
  .directive('crPlayer', function (d3, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'components/cr-circlr/cr-player/cr-player.html',
      scope: {},
      controller: function ($scope, $window) {
        $scope.series = $window.JSON.parse($window.localStorage.getItem('circlrSeries'));
      },
      link: function (scope, el) {
        var svg = d3.select(el[0].firstElementChild);

        var fireFrame = function (payload, index) {
          $timeout(function () {
            var pl = payload;

            svg.transition().attr('viewBox', '0 0 ' + pl.columns + ' ' + pl.rows);

            var c = svg.selectAll('circle').data(pl.points.filter(function (p) { return p.l > pl.settings.cutoff; }));

            c.enter().append('circle')
              .attr('cx', function () { return Math.random() * pl.columns; })
              .attr('cy', function () { return Math.random() * pl.rows; })
              .attr('r', 0);

            c.transition().delay(250).duration(2000)
              .attr('cx', function (d) { return d.x + 0.5; })
              .attr('cy', function (d) { return d.y + 0.5; })
              .attr('fill', function (d) { return d.color; })
              .attr('r', function (d) { return d.l * 0.7; });

            c.exit().remove();
          }, 5000 * index, false);
        };

        for (var i = 0; i < scope.series.length; i++) {
          fireFrame(scope.series[i], i);
        }
      }
    };
  });
