/*
 * services.js
 * Copyright (C) 2016 rmad <rmad@Vostro-3446>
 *
 * Distributed under terms of the MIT license.
 */
var ycnewsServices = angular.module('YCNewsServices', ['ngResource']);

ycnewsServices.factory('Story', ['$resource',
  function($resource){
    return $resource('item/:itemId.json?print=pretty', {}, {
      query: {method:'GET', params:{itemId: 'itemid', print:'pretty'}, isArray:false}
    });
  }]);

ycnewsServices.factory('NewStories', ['$resource',
  function($resource){
    return $resource('newstories.json', {}, {
      query: {method:'GET', params:{print:'pretty'}, isArray:true}
    });
  }]);
