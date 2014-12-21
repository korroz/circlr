'use strict';

angular.module('circlr')
  .controller('ImageCtrl', function ($scope, $log, circlr) {
    var settings = $scope.settings = {
      circles: 5000,
      cutoff: 0.16
    };
    var latestImg;

    $scope.imageUrl = 'http://media3.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/_archive/Entertainment/_Celebrity%20Slideshows/N-S/Pitt-Brad-090717/ss-131015-pitt-tease-01.blocks_desktop_medium.jpg';

    $scope.analyse = function (imgdata) {
      latestImg = imgdata;
      var pl = circlr.analyse(imgdata, settings);
      $log.debug('analyse final:', pl);
      $scope.payload = pl;
    };

    $scope.$watch('settings', function () {
      if (settings && latestImg)
        $scope.analyse(latestImg);
    }, true);
  });
