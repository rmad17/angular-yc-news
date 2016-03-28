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
    angular.module('myApp',['ui.bootstrap'])
    //afactory to consume webservices and return data to controllers.
    .factory('webServices',['$http',function($http){
        return {
            getFriends : function(){
                return  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty').then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return friends
                        });
            }
        }
    }])
    //define controller and inject webServices service as dependency.
    .controller('nsCtrl',['webServices','$scope',function(webServices,$scope){
        webServices.getFriends().then(function(response){
            $scope.items = response; //Assign data received to $scope.data
        });
    }])


})();
