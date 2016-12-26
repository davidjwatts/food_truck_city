var SFCOORDS = { latitude: 37.753972, longitude: -122.431297 };
var dice;
var rs;
var scope;
foodTruckMap.controller("mapCtrl", ["markerService", "reviewService", "uiGmapGoogleMapApi", "$scope", "_", "$window", "Restangular", function(markerService, reviewService, uiGmapGoogleMapApi, $scope, _, $window, Restangular){

  $scope.formData = {};

  // These are attributes for the google.maps object and while this looks quite
  // big, this seemed to be best practices in the examples I looked at.
  $scope.map = {
    center: angular.copy(SFCOORDS),
    zoom: 12,
    pan: true,
    markers: [],
    options: {icon: "https://maps.google.com/mapfiles/kml/paddle/ylw-circle-lv.png"},
    clusterOptions: {minimumClusterSize: 5},
    searchMarker: {
      coords: {},
      id: -1,
      options: {},
      selected: false
    },
    markersEvents: {
      click: function(marker, eventName, model, arguments) {
        $scope.map.window.model = model;
        $scope.map.window.show = true;
      }
    },
    window: {
      show: false,
      closeClick: function(){
        this.show = false;
      },
      options: {
        pixelOffset: {width: 0, height: -10 }
      },
      templateUrl: 'templates/window.html'
    },
    searchbox: {
      template: 'searchbox.tpl.html',
      events: {
        places_changed: function(searchBox){
          var location = searchBox.getPlaces()[0].geometry.location;
          var coords = {
            latitude: location.lat(),
            longitude: location.lng()
          };
          $scope.map.searchMarker.coords = coords;
          $scope.map.searchMarker.selected = true;
          $scope.map.zoom = 14;
          $scope.map.refresh(coords);
        }
      }
    }
  };

  $scope.setFocus = function(truck){
    $window.console.log(truck);
    $window.console.log("setFocus firing");
    $scope.focus_truck = truck;
  }
  // Brings in the processed data from the markers service
  markerService.getMarkers().then(function(markers){
    $scope.map.markers = markers
  });

  // Returns a boolean for whether the location search is active or not
  $scope.hasSearched = function(){
    return $scope.map.searchMarker.selected;
  };

  // Resets the location search to the center of SF and zooms out
  $scope.removeSearchMarker = function(){
    $scope.map.window.show = false;
    delete $scope.map.searchMarker.coords
    $scope.map.zoom = 12;
    $scope.map.refresh(SFCOORDS);
    $scope.map.searchMarker.selected = false;
  };

  // retrieves reviews and adds info to markers
  $window.onload = function(){
    reviewService.getReviews().then(function(data){
    reviewService.addReviews($scope.map.markers);
    });
  };

}]);
