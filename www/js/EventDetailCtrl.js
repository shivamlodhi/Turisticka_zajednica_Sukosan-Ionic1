angular.module('Sukosan')
    .controller('EventDetailCtrl', function ($scope, $stateParams, $http, $cordovaSQLite, $ionicPopup,$state) {
        $scope.location;
        $scope.title="dasdasd";
        $scope.description;
        $scope.date;
        $scope.favorit;
        $scope.myPopup;
         var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
        var query = "SELECT * from favorites where id = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.eventId]).then(function (res) {
            if (res.rows.length > 0) {
                $scope.favorit = 1;
                $scope.location = res.rows.item(0).id;
                $scope.title = res.rows.item(0).title;
                $scope.description = res.rows.item(0).text;
                $scope.date = res.rows.item(0).date; 

            } else {

                var query = "SELECT * from events where id = ?";
                $cordovaSQLite.execute(db, query, [$stateParams.eventId]).then(function (res1) { 
                    $scope.favorit = 2;
                    $scope.location = res1.rows.item(0).id;
                    $scope.title = res1.rows.item(0).title;
                    $scope.description = res1.rows.item(0).text;
                    $scope.date = res1.rows.item(0).date; 
                }, function (err) {
                    console.error(err[0]);
                });
            }
        }, function (err) {
            console.error(err[0]);
        });


          $scope.addFavorit = function (id,favorit) {          
           
            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup.html',
                scope: $scope,
            })

        }
        $scope.remove = function () { 
            var query = "DELETE from favorites where id = ?";
        $cordovaSQLite.execute(db, query, [$stateParams.eventId]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.error(err[0]);
            });
             $scope.favorit=2;
            $scope.myPopup.close();
            $state.go($state.current, {}, { reload: true });


        }



        $scope.add = function () {
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' }); 
                           var query = "INSERT INTO favorites (id, title,date,description) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [$stateParams.eventId, $scope.title, $scope.date, $scope.text]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.error(err[0]);
            });

                 
              
                 
            
             $scope.favorit=1;
            $scope.myPopup.close();
            $state.go($state.current, {}, { reload: true });


        }


       
    });