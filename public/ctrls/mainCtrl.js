app.controller('mainCtrl', function($scope,myService,$location,$modal,$rootScope){
    console.log("main controller");
    $scope.user = {};
    $rootScope.user = JSON.parse(localStorage.getItem('user'));
//    Data.setUser($scope.user);
//    
//    console.log(Data.getUser());
    $scope.isLogout=function(){
     myService.logout();
     $location.path('/');
     swal("logout successfull...")
    }
    //chang password
    
    $scope.isChangepassword=function(){
        $modal.open({
        templateUrl: 'views/changepswdModal.html',
        controller:function($scope,$modalInstance){
        
            $scope.UpdatePassword=function(user){
               $scope.modaldata = $rootScope.user; 
               console.log($scope.modaldata)
                var id= $scope.modaldata.id;
        myService.url='users/changepswd/'+id;
    myService.postService(user).then(function(success){

      if(success.data.message == false){
        console.log("password not updated");
      }
      else{
//          console.log(success.data.success );
          
          if(success.data.success == true){
        
            swal("password updated Successfully");
             
            
        }
         
      }
    },
      function(error){
        console.log(error);
      }
    )
                    
                }
            
            $scope.close=function(){
          $modalInstance.close();
        } 
        
    
        
         },
         
      
         size: 'md',
    backdrop: 'static',
    keyboard: 'false'  
        })
    
    }
    
    //my profile
    $scope.isProfile=function(){
       console.log("-->",$scope.user);
         $modal.open({
         templateUrl: 'views/profileModal.html',
         controller:function($scope,$modalInstance){
           $scope.modaldata = $rootScope.user;
          console.log("user $$$$$$$$$$$$$$$$");
             console.log( $scope.modaldata);
             
            $scope.close=function(){
          $modalInstance.close();
        } 
        
    
        
         },
         
      
         size: 'md',
    backdrop: 'static',
    keyboard: 'false'  
          
      })
      
        
    }
    
    
})