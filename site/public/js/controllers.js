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

urltControllers.controller('dashboardCtrl', ['$scope', '$http','$location',
  function($scope, $http, $location) {
    $scope.dash_info = {};
    $http.get('/dashboard').success(function(dash_info){
      $scope.dash_info = dash_info;
    });

  $scope.post_action = function(post_obj) {
      $http.post('/api/v1/sendEvent',post_obj).success(function(){
        setTimeout(UpdateState,1000);
      });
    }

  $scope.logout = function(){
      $http.get('/logout').success(function(){
        $location.path('/main');
      });
    }

    function UpdateState(){
      $http.get('/state').success(function(state){
          $scope.fsm_state = state.fsm_state;
          setTimeout(UpdateState,2000);
        });
    }

    UpdateState();
  }
]);