angular.module('AppName',[
	'ngRoute'
])
.config(function ($routeProvider,$locationProvider) {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false 
  });
  $routeProvider
    .when('/', {
      templateUrl: '',
      controller: ''
    })
    .otherwise({
      redirectTo: '/'
    });
})

