angular.module('Sukosan')
.controller('EventDetailCtrl', function($scope,$stateParams,$http) { 
  $scope.location;
  $scope.title;
  $scope.description;
   $scope.date; 
    var request = $http({
            method: "GET",
            url: 'http://www.sukosan.hr/rest/events.php', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            for(var v =0; v<data.length;v++){
              console.log(data[v]["id"]);
              if(data[v]["id"]==$stateParams.eventId){
                  $scope.title=data[v]["title"] ;
                   $scope.description=data[v]["text"];
                    $scope.date=data[v]["date"];
            }
            }


        }); 
});