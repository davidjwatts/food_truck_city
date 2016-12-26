foodTruckMap.factory("markerService", ['_', '$http', '$q', function(_, $http, $q){

  // ----------------------------------------
  // Private
  // ----------------------------------------

  var _markers = [];

  var _getPermits = function(){
    return $http.get('https://data.sfgov.org/resource/6a9r-agq8.json')
  };

  var _processPermits = function(data){
    data = _.filter(data, function(o){return (o.latitude != 0 && o.status == "APPROVED" && "dayshours" in o)});
    var markers = [];
    var groups = _groupByLocation(data);
    _addMarkers(groups, markers);
    return markers;
  };

  // helper methods for _processPermits //

  var _groupByLocation = function(data){
    return _.groupBy(data, function(truck){
      var string = "";
      string += truck.latitude.toString();
      string += ",";
      string += truck.longitude.toString();
      return string;
    });
  };

  var _addMarkers = function(groups, markers){
    _.forEach(groups, function(location){
      var marker = _createMarker(location);
      _addTrucks(marker, location);
      _consolidateTrucks(marker.trucks);
      markers.push(marker);
    });
  };

  var _createMarker = function(location){
    var marker = {};
    marker.id = location[0].objectid;
    marker.latitude = location[0].latitude;
    marker.longitude = location[0].longitude;
    marker.trucks = [];
    return marker;
  };

  var _addTrucks = function(marker, location){
    for (var i = 0; i < location.length; i++){
      var truck = {};
      truck.name = location[i].applicant;
      truck.food = location[i].fooditems;
      truck.hours = location[i].dayshours;
      marker.trucks.push(truck);
    };
  };

  var _consolidateTrucks = function(trucks){
    if (trucks.length == 1 || !_duplicateNames(trucks)){
      return;
    };
    var temp;
    for (var i = 0; i < trucks.length - 1; i++){
      for (var k = i + 1; k < trucks.length; k++){
        if (trucks[i].name == trucks[k].name){
          temp = trucks.splice(k, 1);
          trucks[i].hours += " | " + temp[0].hours;
        };
      };
    };
  };

  var _duplicateNames = function(trucks){
    if (_.uniqBy(trucks, 'name').length == trucks.length){
      return false;
    } else {
      return true;
    };
  };

  // ----------------------------------------
  // Public
  // ----------------------------------------

  var obj = {};

  obj.getMarkers = function(){
    return $q(function(resolve, reject){
      _getPermits().then(function(response){
        _markers = _processPermits(response.data);
        resolve(_markers);
      });
    });
  };

  return obj;
}]);
