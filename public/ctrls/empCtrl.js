
app.controller("empCtrl",function($scope,myService,$modal){
    
     myService.url='users/emplist';
    myService.getService().then(function(success){
  	$scope.users = success.data.data;
        console.log("@@@@@@@@@@@@@@@@@@@@@")
  	console.log($scope.users);
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
  
});