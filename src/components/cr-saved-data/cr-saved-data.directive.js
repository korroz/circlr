'use strict';

angular.module('circlr')
  .directive('crSavedData', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/cr-saved-data/cr-saved-data.html',
      scope: { payload: '=' },
      controller: function ($scope, $window) {
        var storage = $window.sessionStorage;
        var JSON = $window.JSON;
        var serieKey = 'circlrSeries';
        var series = [];

        var storedSeries = storage.getItem(serieKey);
        if (storedSeries)
          series = JSON.parse(storedSeries);

        var store = function () {
          storage.setItem(serieKey, JSON.stringify(series));
        };

        $scope.series = series;
        $scope.addPayload = function () {
          series.push(angular.copy($scope.payload));
          store();
        };
        $scope.deletePayload = function (i) {
          series.splice(i, 1);
          store();
        };
      }
    };
  });
