var SFCOORDS = { latitude: 37.753972, longitude: -122.431297 };
var dice;
foodTruckMap.controller("mapCtrl", ["markerService", "uiGmapGoogleMapApi", "$scope", "_", "$window", function(markerService, uiGmapGoogleMapApi, $scope, _, $window){

  $scope.formData = {};

  $scope.map = { center: angular.copy(SFCOORDS), zoom: 12, pan: true, markers: [], options: {icon: "https://maps.google.com/mapfiles/kml/paddle/ylw-circle-lv.png"}};

  $scope.map.clusterOptions = {
    minimumClusterSize: 5,
  };

  markerService.getMarkers().then(function(markers){
    $scope.map.markers = markers
  });


    $scope.map.markersEvents = {
            click: function(marker, eventName, model, arguments) {
              $scope.map.window.model = model;
              $scope.map.window.show = true;
            }
        };
    $scope.map.window = {

      show: false,
      closeClick: function(){
        this.show = false;
      },
      options: {
        pixelOffset: {width: 0, height: -10 }
      },
      templateUrl: 'templates/window.html'

    };

    $scope.map.searchMarker = {
      coords: {},
      id: -1,
      options: {},
      selected: false
    };

    $scope.hasSearched = function(){
      return $scope.map.searchMarker.selected;
    };

    $scope.map.searchbox = {
      template:'searchbox.tpl.html',
      events:{
        places_changed: function (searchBox) {
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
    };

    $scope.queryExists = function(query){
      $window.console.log($scope.query);

    }

    $scope.removeSearchMarker = function(){
      dice = $scope.map;
      $scope.map.searchMarker.coords = angular.copy(SFCOORDS);
      $scope.map.zoom = 12;
      $scope.map.center = angular.copy(SFCOORDS);
      $scope.map.refresh($scope.map.center);
      $scope.map.searchMarker.selected = false;

    };
}]);
