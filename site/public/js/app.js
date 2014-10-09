'use strict';

/* App Module */

var urltSite = angular.module('urltSite', [
  'ngRoute',
  'urltControllers',
  'ui.bootstrap'
]);

var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer(); 
    // Make an AJAX call to check if the user is logged in 
    $http.get('/loggedin').success(function(user){ 
      // Authenticated 
      if (user.loggedin) 
        $timeout(deferred.resolve, 0); 
      // Not Authenticated 
      else { 
        $rootScope.message = 'You need to log in.'; 
        $timeout(function(){
            deferred.reject();
            }, 0); 
          $location.url('/main'); 
        } 
      }
    );
}

urltSite.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'mainCtrl'
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: { loggedin: checkLoggedin }
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);
