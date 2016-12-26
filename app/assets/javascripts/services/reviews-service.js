foodTruckMap.factory("reviewService", ['Restangular', '$window', '_', '$http', '$q', function(Restangular, $window, _, $http, $q){

  var _reviews = {};



  var _allReviews = function(){
    return Restangular.all("reviews").getList().then(function(data){
      return data;
    });
  };

  var _groupReviews = function(reviews){
    return _.groupBy(reviews, function(review){
      return review.truck_name;
    });
  };

  _avgRating = function(name){
    var sum = 0;
    var truck = _reviews[name];
    var num_reviews = truck.length
    for(j = 0; j < num_reviews; j++){
      sum += truck[j].rating;
    };
    return sum/num_reviews;
  };

  // public //

  var obj = {};

  obj.getReviews = function(){
    return $q(function(resolve, reject){
      _allReviews().then(function(reviews){
        _reviews = _groupReviews(reviews);
        resolve(_reviews);
      });
    });
  };

  obj.addReviews = function(markers){
    _.forEach(markers, function(marker){
      _.forEach(marker.trucks, function(truck){
        truck.reviews = _reviews[truck.name]
        if (!!truck.reviews){
          truck.num_reviews = Object.keys(truck.reviews).length
          truck.avg_rating = _avgRating(truck.name)
        };
      });
    });
  };

  return obj;

}]);
