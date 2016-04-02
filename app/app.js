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
    //afactory to consume webservices and return data to controllers.
    .factory('webServices',['$http',function($http){
        return {
            getNewStories : function(){
                return  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty').then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return friends
                        });
            }
        }
    }])
    //define controller and inject webServices service as dependency.
    .controller('nsCtrl',['webServices','$scope',function(webServices,$scope){
        webServices.getNewStories().then(function(response){
            $scope.items = response; //Assign data received to $scope.data
        });
    }])
    .factory('story',['$http',function($http){
        return {
            getStory : function(id){
                return  $http.get('https://hacker-news.firebaseio.com/v0/item/'
                                    + id + '.json?print=pretty').
                                    then(function(response){ //wrap it inside another promise using then
                            return response.data;  //only return friends
                        });
            }
        }
    }])
    //define controller and inject webServices service as dependency.
    .controller('nsStory',['story','$scope',function(story, $scope){
        var id = $scope.$parent.$parent.item;
        story.getStory(id).then(function(response){
            $scope.stobject = response; //Assign data received to $scope.data
        });
    }])


})();
