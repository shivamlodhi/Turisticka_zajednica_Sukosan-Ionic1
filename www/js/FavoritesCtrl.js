
angular.module('Sukosan')
    .controller('FavoritesCtrl', function ($scope, $rootScope, $http, $cordovaSQLite,$ionicPopup) {
        console.log("asdasd");
         $scope.myPopup;
        $scope.addSettings = function ( ) {  
            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popupSettings.html',
                scope: $scope,
            })

            $scope.remove = function () { 
                $scope.myPopup.close();
                db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                var query = "Select * from favorites;";
                $cordovaSQLite.execute(db, query).then(function (res) {
                    console.log("insertId: " + res);
                }, function (err) {
                    console.error(err[0]);
                });

                $scope.myPopup.close();
            }

        }
        $scope.favoriti = [];
        $scope.items;
        
           document.addEventListener('deviceready', function () { 
        var query = "SELECT * FROM favorites";
        db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
        $cordovaSQLite.execute(db, query, []).then(function (res) {

            if (res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.favoriti.push({
                        id: res.rows.item(i).id,
                        title: res.rows.item(i).title,
                        date: res.rows.item(i).date,
                    });
                    console.log("ajdeee" + $scope.favoriti[0]["id"]);
                }
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error("error=>" + err);
        });

           })

    });