var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'mainCtrl',
      templateUrl: '/templates/home.html'
    })
    .state('favorites', {
      url: '/favorites',
      controller: 'favCtrl',
      templateUrl: '/templates/favorites.html',
    });

  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode(true);
}]);