/*
 * controllers.js
 * Copyright (C) 2016 rmad <rmad@Vostro-3446>
 *
 * Distributed under terms of the MIT license.
 */
function newStoriesController($scope, $http) {
    var url = "https://hacker-news.firebaseio.com/v0/newstories";

    $http.get(url).success( function(response) {
       $scope.items = response;
    });
}
