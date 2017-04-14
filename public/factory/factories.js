app.factory('signup',function($http,$q){
    var object = {};
    object.signup = function(data){
        console.log(data);
        var defered = $q.defer();
    $http({
        url : 'users/register',
        method : 'POST',
        data : data
    }).then(function(success){
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
    return object;
    
    
    
})



//login
    app.factory('login',function($http,$q){
            var object = {};

    object.login = function(data){
        var defered = $q.defer();
    $http({
        url : 'users/authenticate',
        method : 'POST',
        data : data
    }).then(function(success){
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
    return object;
})