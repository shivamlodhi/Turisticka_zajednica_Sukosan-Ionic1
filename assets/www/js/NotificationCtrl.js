angular.module('Sukosan')
    .controller('NotificationCtrl', function ($scope, $stateParams, $http, ionicDatePicker, $filter, $cordovaSQLite,$state ) {
        $scope.events = [];


        $scope.cancelNot = function (id) {
             var query = "DELETE  FROM notifications where id = "+id;

            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, []).then(function (res) {

            cordova.plugins.notification.local.cancel(id, function () {
                // Notification was cancelled
            });
             $state.go($state.current, {}, { reload: true });
            });

        }





        document.addEventListener('deviceready', function () {
            var query = "SELECT * FROM notifications";

            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                console.log("komada: " + res.rows.length);
                if (res.rows.length > 0) {
                    console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).latitude);
                    var request = $http({
                        method: "POST",
                        url: 'http://appeventnet.com/rest/events.php',
                        data: { id: "11", jezik: window.localStorage.getItem("language") },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                    });
                    request.success(function (data) {

                        for (var i = 0; i < res.rows.length; i++) {
                            for (var v = 0; v < data.length; v++) {
                                if (data[v]["id"] == res.rows.item(i).id) { 
                                    $scope.events.push({
                                        id: data[v]["id"],
                                        title: data[v]["title"],
                                        date: res.rows.item(i).hour,
                                        images: data[v]["images"]
                                    });
                                }

                            }

                            console.log("ajdeee" + $scope.events.length);
                        }

                    });


                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error("error=>" + err);
            });
        })


    })