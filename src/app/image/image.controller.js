'use strict';

angular.module('circlr')
  .controller('ImageCtrl', function ($scope, $log, circlr) {
    var settings = $scope.settings = {
      resolution: null,
      cutoff: 0.16
    };
    var latestImg;

    $scope.circles = 5000;
    $scope.imageUrl = 'http://media3.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/_archive/Entertainment/_Celebrity%20Slideshows/N-S/Pitt-Brad-090717/ss-131015-pitt-tease-01.blocks_desktop_medium.jpg';

    var resFromMaxCircles = function (d) {
      return circlr.resolution(d.width, d.height, $scope.circles);
    };
    $scope.analyse = function (imgdata) {
      latestImg = imgdata;
      settings.resolution = resFromMaxCircles(imgdata);
      var pl = circlr.analyse(imgdata, settings);
      $log.debug('analyse final:', pl);
      $scope.payload = pl;
    };

    $scope.$watch('circles', function () {
      if (latestImg && settings && settings.resolution !== resFromMaxCircles(latestImg))
        $scope.analyse(latestImg);
    });
  });
