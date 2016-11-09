var SFCOORDS = { latitude: 37.753972, longitude: -122.431297 };

foodTruckMap.controller("mapCtrl", ["markerService", "uiGmapGoogleMapApi", "$scope", "_", "$window", function(markerService, uiGmapGoogleMapApi, $scope, _, $window){

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
    $scope.map.searchMarker.coords = angular.copy(SFCOORDS);
    $scope.map.zoom = 12;
    $scope.map.center = angular.copy(SFCOORDS);
    $scope.map.refresh($scope.map.center);
  };

}]);
