app.factory('myService',function($http,$q){
    var object = {};
   object.url;
   
    //post service
    
    object.postService = function(data){
       
  
        var defered = $q.defer();
        var reqObj = 
                {
        url :  object.url,
        method : 'POST',
        data : data,
       
    }
    console.log(reqObj);
    $http(reqObj).then(function(success){
        defered.resolve(success);
        // console.log(success);
    },
        function(error){
            // console.log(error);
            defered.reject(error);
        }
    )
    return defered.promise;
    }
    
    //get service
    
    object.getService = function(data){
       
        console.log(data);
        var defered = $q.defer();
        var reqObj = 
                {
        url :  object.url,
        method : 'GET',
     
    }
    console.log(reqObj);
    $http(reqObj).then(function(success){
        defered.resolve(success);
        console.log(success);
    },
        function(error){
            // console.log(error);
            defered.reject(error);
        }
    )
    return defered.promise;
    }
    return object;
    
})



////login
//    app.factory('login',function($http,$q){
//            var object = {};
//
//    object.login = function(data){
//        var defered = $q.defer();
//    $http({
//        url : 'users/authenticate',
//        method : 'POST',
//        data : data,
//        
//    }).then(function(success){
//        defered.resolve(success);
//        // console.log(success);
//    },
//        function(error){
//            // console.log(error);
//            defered.reject(error);
//        }
//    )
//    return defered.promise;
//    }
//    return object;
//})