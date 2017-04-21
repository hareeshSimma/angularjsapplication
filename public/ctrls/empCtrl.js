
app.controller("empCtrl",function($scope,myService,$modal,$location){
    
//    console.log($scope.user);
     myService.url='users/emplist';
    myService.getService().then(function(success){
  	$scope.users = success.data.data;
//        console.log("@@@@@@@@@@@@@@@@@@@@@")
//  	console.log($scope.users);
  },
  	function(error){
  		console.log(error);
  	}
  );
  //preview employees
  $scope.isPreview=function(data){
      console.log(data)
      $modal.open({
         templateUrl: 'views/previewModel.html',
         controller:function($scope,$modalInstance){
             $scope.modaldata = data;
            $scope.close=function(){
          $modalInstance.close();
        } 
       },
          size: 'md',
    backdrop: 'static',
    keyboard: 'false'  
          
      })
      
  }
  
  //edit employees
  
  $scope.isEdit=function(data){
      $modal.open({
         templateUrl: 'views/editModel.html',
         controller:function($scope,$modalInstance,$timeout){
             $scope.modaldata = data;
             console.log($scope.modaldata)
            var id=data._id;
            console.log(id)
            $scope.close=function(){
          $modalInstance.close();
        }
        
        $scope.Edit=function(){
            
//             
            $timeout(function(){
                console.log(id)
                $scope.user = {};
                myService.url='users/updateemp/'+id;
 		console.log(data);
                console.log("##################");
 		myService.postService(data).then(function(success){
  	        console.log(success);
  		$scope.user = success.data;
      
               console.log(success.data);
               if(success.data.success == true){
               window.location.reload()
                swal("Updated successfully .....");
            
             }
  		},
  		function(error){
 		console.log(error);
               swal("Not Updated.....");
  			}
 		)
                
             
             $modalInstance.close();
            },1000)
            
            
            
        }
    
        
         },
         
      
         size: 'md',
    backdrop: 'static',
    keyboard: 'false'  
          
      })
      
  }
  
  //Remove employee
  
  $scope.isRemove=function(data){
      $modal.open({
    templateUrl: 'views/confirmModel.html',
    controller:function($scope,$modalInstance,$timeout){
             $scope.modaldata = data;
             console.log($scope.modaldata)
            var id=data._id;
            console.log(id)
            $scope.close=function(){
          $modalInstance.close();
        }
        
         $scope.yes=function(){
            
            $timeout(function(){
                console.log(id)
                $scope.user = {};
                myService.url='users/removeemp/'+id;
 		console.log(data);
                console.log("##################");
 		myService.postService(data).then(function(success){
  	        console.log(success);
  		$scope.user = success.data;
      
               console.log(success.data);
               if(success.data.success == true){
                window.location.reload()
                swal("Deleted successfully .....");
            
             }
  		},
  		function(error){
 		console.log(error);
               swal("Not Deleted.....");
  			}
 		)
                
             
             $modalInstance.close();
            },1000)
            
            
            
        }
    
        
        
    },
    size: 'sm',
    backdrop: 'static',
    keyboard: 'false'  
      
      })
              
  }
  
  
  
  
    $scope.user=JSON.parse(localStorage.getItem('user'));
   
  
  
});