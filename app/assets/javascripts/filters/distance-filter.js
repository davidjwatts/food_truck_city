foodTruckMap.filter("distanceFilter", [function(){
  return function(markers,coords, reverse){
    return _.sortBy(markers, [function(marker){
      var p1 = new google.maps.LatLng(marker.latitude, marker.longitude);
      var p2 = new google.maps.LatLng(coords.latitude, coords.longitude);
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
    }]);
  };
}]);
