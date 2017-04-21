app.controller("loginCtrl",function($scope,$location,myService,Data){
    $scope.user = {};
   $scope.signup = function(user){
       myService.url='users/register';
    myService.postService(user).then(function(success){
//      console.log(success.data);
      if(success.data.message == "Usermail already exists try with another"){
        console.log("username already exists");
      }
      else{
//          console.log(success.data.success );
          
          if(success.data.success == true){
           window.location.reload()
            swal("User Registered Successfully");
             
            console.log('register successfully...');
        }
         
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
//  		console.log(data);
  		myService.postService(data).then(function(success){
//  	        console.log(success);
  		$scope.user = success.data;

      console.log(success.data);
        if(success.data.success == true){
            
            var userData = {
                "id_token":success.data.token,
                "user":success.data.user
            };
            Data.setUser(userData);
            myService.storeUserData(success.data.token, success.data.user);
           
           
   var name=$scope.user.username;
             
            $location.path('/employees');
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