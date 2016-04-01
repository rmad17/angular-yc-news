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
    angular.module('myApp',[
    'ui.bootstrap',
    'myApp.view1',
    'myApp.view2',
    'myApp.version']).

    config(['$routeProvider', function($routeProvider) {
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

    // Top Stories
    .factory('tsFactory',['$http',function($http){
        var ids = [];
        var tsList = [];
        return {
            getTopStories : function(){
                return  $http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(function(response){ //wrap it inside another promise using then
                            ids = response.data;
                            var getStoryDetails = function(id){
                                var u1 = 'https://hacker-news.firebaseio.com/v0/item/';
                                var u2 = id.toString();
                                var u3 = '.json?print=pretty';
                                var url = u1 + u2 + u3;
                                return  $http.get(url).
                                                    then(function(response) { //wrap it inside another promise using then
                                                    return response.data;  //only return friends
                                });
                            };
                            for(var i = 0; i < 20; i++){
                                tsList.push(getStoryDetails(ids[i]));
                            }
                            debugger;
                            return tsList;
                });
        }}}])
    //define controller and inject webServices service as dependency.
    .controller('tsCtrl',['tsFactory','$scope',function(tsFactory, $scope){
        tsFactory.getTopStories().then(function(response){
            $scope.tsitems = response; //Assign data received to $scope.data
        });
    }]);

})();
