'use strict';

/* Controllers */

var urltControllers = angular.module('urltControllers', ['ui.bootstrap','ngCookies']);

urltControllers.controller('mainCtrl', ['$scope',
  function ($scope) {
    }
  ]);

urltControllers.controller('registerCtrl', ['$scope', '$log','$http','$location',
  function($scope, $log,$http,$location) {

    $scope.user = {
      first_name:'',
      last_name:'',
      email:'',
      eula_accepted:false
    };

    $scope.createProfile = function(){
      $http.post('/register',$scope.user).success(function(){
        $location.path('/dashboard');
      });
    }
  }
]);

urltControllers.controller('loginCtrl', ['$scope', '$log','$http','$location',
  function($scope, $log,$http,$location) {
    $scope.user ={}
    $scope.login = function(){
      $http.post('/login',$scope.user).success(function(){
        $location.path('/dashboard');
      });
    }
  }
]);

urltControllers.controller('dashboardCtrl', ['$scope', '$http',
  function($scope, $http, $log) {
    $scope.dash_info = {};
    $http.get('/dashboard').success(function(dash_info){
      $scope.dash_info = dash_info;
    });

  $scope.post_action = function(post_obj) {
      $http.post('/api/v1',post_obj).success(function(){
      });
    }
  }
]);