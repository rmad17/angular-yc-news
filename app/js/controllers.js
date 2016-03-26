/*
 * controllers.js
 * Copyright (C) 2016 rmad <rmad@Vostro-3446>
 *
 * Distributed under terms of the MIT license.
 */
var app = angular.module('myApp', []);
console.log("a");
app.controller('nSCtrl',['webServices','$scope',function(webServices,$scope){
        webServices.getnewStories().then(function(response){
            $scope.items = response; //Assign data received to $scope.data
    console.log("b");
        });
    }]);
/*app.controller('nSController', function($scope, $http) {
    var url = "https://hacker-news.firebaseio.com/v0/newstories";

    console.log("b");
    $http.get(url).success( function(response) {
       $scope.items = response;
    });
});*/
console.log("c");
