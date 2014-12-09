'use strict';

angular.module('circlr')
  .directive('crIrcl', function ($log, $window) {
    var d3 = $window.d3;
    return {
      restrict: 'E',
      template: '<svg></svg>',
      link: function (scope, el) {
        var svg = d3.select(el[0].firstElementChild);

        scope.$watch('payload', function (newPayload) {
          if (!newPayload)
            return;

          var pl = newPayload;

          svg.attr('width', 600)
            .attr('height', 600)
            .attr('viewBox', '0 0 ' + pl.columns + ' ' + pl.rows);

          var c = svg.selectAll('circle').data(pl.points.filter(function (p) { return p.val > pl.settings.cutoff; }));

          c.enter().append('circle')
            .attr('fill', '#fff');

          c.attr('cx', function (d) { return d.x + 0.5; })
            .attr('cy', function (d) { return d.y + 0.5; })
            .attr('r', function (d) { return d.val * 0.5; });

          c.exit().remove();
        });
      }
    };
  });
