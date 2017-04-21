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
    
     object.storeUserData = function(token, user){
        console.log("hai from service");
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
//        var authToken = token;
//         var user = user;
//         console.log(user)
     }
     object.logout = function(){
//        var authToken = null;
//    var user = null;
     localStorage.clear()
     }
    
    
    
    return object;
    
})




