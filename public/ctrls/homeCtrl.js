app.controller("homeCtrl",function($scope){
     $scope.user=JSON.parse(localStorage.getItem('user'));
})