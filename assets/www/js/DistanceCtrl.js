angular.module('Sukosan')
.controller('DistanceCtrl', function($rootScope,$scope,$stateParams,$location,NgMap, $http,$location,$state,$ionicPlatform,$ionicHistory){ 
    $scope.pocetak=window.localStorage.getItem("lokacija");
$scope.kraj=window.localStorage.getItem("lokacija2");
$scope.naziv=window.localStorage.getItem("naziv"); 
var vm = this;
    vm.dynMarkers = []
           $ionicPlatform.registerBackButtonAction(function (event) { 
            $ionicHistory.goBack();
  
}, 100);



    NgMap.getMap().then(function (map) {
 
  $rootScope.map = map; 

});
})