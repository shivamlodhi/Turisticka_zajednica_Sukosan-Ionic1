
angular.module('Sukosan')
    .controller('FavoritesCtrl', function ($scope, $rootScope, $http, $cordovaSQLite, $ionicPopup, $state) {
        console.log("asdasd");
        $scope.myPopup;
        $scope.id;
        $scope.hours;

        $scope.go = function (id) {
            $state.go('app.detail', { eventId: id })
        }

        // Otvara postavke za odredeni id
        $scope.addSettings = function (id) {
            $scope.id = id;
             var query = "SELECT * from favorites where id = ?";
            $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) {
                 $scope.hours =  res.rows.item(0).notification; 
            }, function (err) {
                console.error(err[0]);
            });

            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popupSettings.html',
                scope: $scope,
            })

        }
        //remuva iz favorita event na koji je kliknut
        $scope.remove = function () {
            var query = "DELETE from favorites where id = ?";
            $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.error(err[0]);
            });

            $scope.myPopup.close();
            $state.go($state.current, {}, { reload: true });


        }
          $scope.cancel = function () {
            $scope.myPopup.close();

        }

        $scope.addNotification=function(){
            console.log(document.getElementById("hour").value,$scope.id);
              var query = "update favorites set notification = ? where id = ?";
            $cordovaSQLite.execute(db, query, [document.getElementById("hour").value,$scope.id]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.error(err[0]);
            });

            $scope.myPopup.close();
            
           
            
    }
    $scope.numberPickerObject = {
    inputValue: 0, //Optional
    minValue: -9007199254740991,
    maxValue: 9007199254740991,
    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
    titleLabel: 'Number Picker',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
    timePickerCallback(val);
  }
};



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
                        console.log("ajdeee" + $scope.favoriti.length);
                    }
                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error("error=>" + err);
            });
        })

    });