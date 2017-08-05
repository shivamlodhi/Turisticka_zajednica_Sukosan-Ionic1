angular.module('Sukosan')
    .controller('EventDetailCtrl', function ($scope, $stateParams, $http, $cordovaSQLite, $ionicPopup,$state,NgMap) {
        $scope.location="Sukosan";
        $scope.title="Ribicke festice";
        $scope.description="Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i slovoslagarskoj industriji. Lorem Ipsum postoji kao industrijski standard još od 16-og stoljeća, kada je nepoznati tiskar uzeo tiskarsku galiju slova i posložio ih da bi napravio knjigu s uzorkom tiska. Taj je tekst ne samo preživio pet stoljeća, već se i vinuo u svijet elektronskog slovoslagarstva, ostajući u suštini nepromijenjen. " ;
        $scope.date="27.04.2017";
        $scope.favorit;
        $scope.myPopup;
          alert($stateParams.eventId);
        console.log("aaaaaaaaaaaaaaaa");
         var request = $http({
            method: "GET",
            url: 'http://www.sukosan.hr/rest/events.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            for(var i;i<data.length;i++){
                
                    alert(data["title"]);
                if(i["id"]==$stateParams.eventId){
                    $scope.title = i["title"];
                    $scope.description = i["description"];
                    $scope.date = i["date"];

                }
            }

        });

        NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

   $scope.addFavorit = function () {   
                $scope.myPopup = $ionicPopup.show({
                    templateUrl: 'templates/popup.html',
                    scope: $scope,
                })

            }
    });