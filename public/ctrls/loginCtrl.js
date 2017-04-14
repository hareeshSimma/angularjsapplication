app.controller("loginCtrl",function($scope,$location,myService){
    $scope.user = {};
   $scope.signup = function(user){
       myService.url='users/register';
    myService.postService(user).then(function(success){
      console.log(success.data);
      if(success.data.message == "Usermail already exists try with another"){
        console.log("username already exists");
      }
      else{
          console.log('register successfully...')
        $location.path("/");
      }
    },
      function(error){
        console.log(error);
      }
    )
  }
    
  //login module
  

  $scope.login = function(data){
       myService.url='users/authenticate';
  		console.log(data);
  		myService.postService(data).then(function(success){
  	        console.log(success);
  		$scope.user = success.data;
//        $localStorage.user = {
//          username : success.data.username
//        }
      console.log(success.data);
        if(success.data.success == true){
            $location.path('/home');
            swal("logged in successfully");
            
        }
  		},
  		function(error){
  		console.log(error);
          swal("wrong credentials");
  			}
  		)
  }


    
})