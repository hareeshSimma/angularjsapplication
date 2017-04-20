app.factory('Data',['$rootScope',function($rootScope){
  var data = {};
  return {

  getUser : function () { 
    return data.user;
  },

  setUser : function (userData) {
    data.user = userData;
  }

}
}]);
