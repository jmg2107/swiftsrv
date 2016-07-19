angular.module("sqrtl", [
    "sqrtl.httpRequest",
    "sqrtl.form",
    "ui.router",
    "ngRoute"
  ])
  .config(function($stateProvider, $urlRouterProvider){
    //sets default state when the app is booted
    $urlRouterProvider
      .otherwise('/form');
    //the form state that allows users to create their request
    $stateProvider
      .state('form', {
        url: '/form',
        templateUrl: 'app/form/form.html',
        controller: 'FormController'
      });
  });
angular.module("sqrtl.form", [])
  .controller("FormController", function($scope, Adventures){
    $scope.adventure = {};
    $scope.getLocationAndCategory = function(location, category){
      Adventures.requestAdventures(location, category)
        .then(function(data) {
          $scope.adventure = data;
        });
    };
  });
angular.module('sqrtl.httpRequest', [])
  .factory('Adventures', function($http){
    //requests venues that meet location and category criteria
    //TODO: add user parameters and such
    var requestAdventures = function(location, category){
      var url = 'http://jsonplaceholder.typicode.com/posts/1';
      //actual url is '/api/getYelp'
      return $http({
        method: 'GET',
        url: url,
        // data: JSON.stringify({
        //   category: category,
        //   location: location
        // })
      }).then(function(resp){
        return resp;//.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    return {
      requestAdventures: requestAdventures
    };

  });
  // .factory('UserResponses', function($http){
  //   //tells the database if a user accepted suggestions
  //   var initialReaction = function(userName, restauranArray){
  //     return $http({
  //       method: 'POST',
  //       url: '/adventure',
  //       data: JSON
  //     }).then(functon(){
  //       //should do something.
  //     })
  //   }

  // });