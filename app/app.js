/*
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'nSCtrl'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
*/
(function(){
    var app = angular.module('myApp',[
    'ui.bootstrap',
    'myApp.view1',
    'myApp.view2',
    'myApp.version']);

    app
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: "View1Ctrl"
        }).
        when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: "View2Ctrl"
        }).
        otherwise({redirectTo: '/view1'});
    }])

})();
