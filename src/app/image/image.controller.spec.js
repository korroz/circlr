'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('circlr'));

  beforeEach(inject(function($rootScope) {
  	scope = $rootScope.$new();
  }));

  // xit('should define more than 5 awesome things', inject(function($controller) {
  //   expect(scope.awesomeThings).toBeUndefined();

  //   $controller('ImageCtrl', {
  //     $scope: scope
  // 	});

  //   expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
  //   expect(scope.awesomeThings.length > 5).toBeTruthy();
  // }));
});
