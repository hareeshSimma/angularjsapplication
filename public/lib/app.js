var app=angular.module("myApp",['ngRoute','ui.bootstrap']);
app.config( function($routeProvider,$locationProvider){
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
    $routeProvider
    .when("/", {
        templateUrl : "views/login.html",
        controller : "loginCtrl"
    })
    .when("/home", {
        templateUrl : "views/home.html",
        controller : "homeCtrl"
    })
    .when("/employees", {
        templateUrl : "views/employees.html",
        controller : "empCtrl"
    })
    .when("/contactus", {
        templateUrl : "views/contactus.html",
        controller : "contactCtrl"
    })
    .otherwise({
        redirectTo: '/'
      });
    

});
//app.controller('mainCtrl', function($scope,myService,$location){
//    console.log("main controller");
//    $scope.user=JSON.parse(localStorage.getItem('user'));
//    $scope.isLogout=function(){
//     myService.logout();
//     $location.path('/');
//     swal("logout successfull...")
//    }
//})