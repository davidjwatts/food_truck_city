foodTruckMap.factory("reviewService", ['Restangular', '$window', '_', '$http', '$q', function(Restangular, $window, _, $http, $q){

  var _reviews = {};



  // public //

  var obj = {};



  obj.all = function(){
    return Restangular.all("reviews").getList().then(function(reviews){
      _reviews = reviews;
      return _reviews;
    });
  };



  return obj;
}]);
