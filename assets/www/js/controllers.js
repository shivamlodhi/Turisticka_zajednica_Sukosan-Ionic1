angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $http) {
    $scope.info = "grayscale";
    $scope.favorit = "grayscale";
    $scope.settings = "grayscale";
    $scope.food = "grayscale";
    $scope.services = "grayscale";
    $scope.infoText = "";
    $scope.infoFavorit = "";
    $scope.infoSettings = "";
    $scope.infoFood = "";
    $scope.infoServices = ""; 


    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) { 
    //});

    $scope.openState = function (state) {

      $scope.infoText = "";
      $scope.infoFavorit = "";
      $scope.infoSettings = "";
      $scope.infoFood = "";
      $scope.infoServices = "";

      if (state == "app.info") {
        $scope.info = "";
        $scope.infoText = "#009900";
        $scope.favorit = "grayscale";
        $scope.settings = "grayscale";
        $scope.infoFavorit = "dimgrey";
        $scope.activities = "grayscale";
        $scope.food = "grayscale";
        $scope.infoSettings = "grayscale";
        $scope.food = "grayscale";
        $scope.services = "grayscale";


      }

      if (state == "app.favorites") {
        $scope.info = "grayscale";
        $scope.infoText = "dimgrey";
        $scope.favorit = "";
        $scope.settings = "grayscale";
        $scope.infoFavorit = "#009900";
        $scope.activities = "grayscale";
        $scope.food = "grayscale";
        $scope.infoSettings = "grayscale";
        $scope.food = "grayscale";
        $scope.services = "grayscale";
      }
      if (state == "app.settings") {
        $scope.info = "grayscale";
        $scope.infoText = "dimgrey";
        $scope.favorit = "grayscale";
        $scope.settings = "";
        $scope.infoFavorit = "grayscale";
        $scope.activities = "grayscale";
        $scope.food = "grayscale";
        $scope.infoSettings = "#009900";
        $scope.food = "grayscale";
        $scope.services = "grayscale";
      }

      if (state == "app.food") {
        $scope.info = "grayscale"; 
        $scope.favorit = "grayscale";
        $scope.settings = "grayscale";
        $scope.infoFavorit = "grayscale";
        $scope.activities = "grayscale";
        $scope.food = "grayscale";
        $scope.infoFood = "#009900";
        $scope.food = "";
        $scope.services = "grayscale";
      }


      if (state == "app.services_choice") {
        $scope.info = "grayscale";
        $scope.infoText = "dimgrey";
        $scope.favorit = "grayscale";
        $scope.settings = "grayscale";
        $scope.infoFavorit = "grayscale";
        $scope.activities = "grayscale";
        $scope.food = "grayscale"; 
        $scope.food = "grayscale";
        $scope.services = " ";
        $scope.infoServices = "#009900"; 
      }


      $scope.klasa
      $state.go(state);
    };

  })

