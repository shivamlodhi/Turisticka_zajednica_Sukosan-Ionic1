
angular.module('Sukosan')
    .controller('FavoritesCtrl', function ($scope, $rootScope, $http, $cordovaSQLite, $ionicPopup, $state, $cordovaLocalNotification, ionicTimePicker, $ionicLoading, $cordovaGeolocation, $cordovaSocialSharing) {
        console.log("asdasd");
        $scope.myPopup;
        $scope.id;
        $scope.hours;
        $scope.time;
        $scope.timePrikaz = "CHOOSE";
        $scope.hourDefault;
        $scope.minuteDefault;

        $scope.go = function (id) {
            $state.go('app.detail', { eventId: id })
        }
        var ipObj1 = {  
            callback: function (val) {      //Mandatory
                if (typeof (val) === 'undefined') {
                    console.log('Time not selected');
                } else {

                    $scope.time = new Date(val * 1000);
                    $scope.hourDefault = $scope.time.getUTCHours();
                    $scope.minuteDefault = $scope.time.getUTCMinutes()
                    $scope.timePrikaz = $scope.time.getUTCHours() + ":" + $scope.time.getUTCMinutes();
                    if ($scope.time.getUTCMinutes() == 0) {
                        $scope.timePrikaz = $scope.timePrikaz + "0";
                    }
                    if ($scope.time.getUTCHours() < 10) {
                        $scope.timePrikaz = "0" + $scope.timePrikaz;
                    }
                }
            },
            inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
            format: 24,         //Optional
            step: 15,           //Optional
            setLabel: 'Set'    //Optional
        };


        $scope.setTime = function () {
            ionicTimePicker.openTimePicker(ipObj1);
        }

        // Otvara postavke za odredeni id i postavljaju se sati za notifikaciju ako postoje

        $scope.addNotification2 = function (id) {
            $scope.id = id;
            window.localStorage.setItem("id", id);
            var query = "SELECT * from events where id = ?";
            $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) {
                $scope.hour = res.rows.item(0).notification;
            }, function (err) {
                console.error(err[0]);
            });

            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup.html',
                controller: "FavoritesCtrl",
                scope: $scope,
            })

        }
        //remuva iz favorita event na koji je kliknut
        $scope.remove = function (id) {
            var query = "DELETE from favorites where id = ?";
            $cordovaSQLite.execute(db, query, [id]).then(function (res) {
                console.log("insertId: " + res.insertId);
                $state.go($state.current, {}, { reload: true });
            }, function (err) {
                console.error(err[0]);
            });

            $state.go($state.current, {}, { reload: true });
            $ionicLoading.show({ template: 'Favorit izbrisan ', noBackdrop: true, duration: 1000 });


        }
        $scope.cancel = function () {
            $scope.myPopup.close();

        }


        $scope.shareViaFacebook = function () {
            $ionicLoading.show({ template: 'Connecting with Facebook, please wait! ', noBackdrop: true, duration: 3000 });
            $cordovaSocialSharing.canShareVia("facebook", "null", null, "http://www.sukosan.hr/").then(function (result) {
                $cordovaSocialSharing.shareViaFacebook("null", null, "http://www.sukosan.hr/");
            }, function (error) {
                alert(error)
            });
        }



        $scope.showMapPath = function (lat, long) {
            var posOptions = { timeout: 13000, enableHighAccuracy: true };
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {

                    $scope.lat = position.coords.latitude;

                    $scope.long = position.coords.longitude;
                    window.localStorage.setItem("long", $scope.long);

                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng($scope.lat, $scope.long);
                    var request = {
                        latLng: latlng
                    };

                    geocoder.geocode(request, function (data, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (data[0] != null) {
                                var res = data[1].formatted_address;
                                var array = res.split(',');
                                $scope.lokacija = array[0];

                                console.log(data[0].formatted_address);
                                window.localStorage.setItem("lokacija", data[0].formatted_address)
                            } else {
                                alert("No address available");
                            }
                        }
                    })
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(lat, long);
                    var request = {
                        latLng: latlng
                    };

                    geocoder.geocode(request, function (data, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (data[0] != null) {
                                var res = data[1].formatted_address;
                                var array = res.split(',');
                                $scope.lokacija = array[0];
                                window.localStorage.setItem("lokacija2", data[0].formatted_address)
                                console.log(data[1].formatted_address);;
                            } else {
                                alert("No address available");
                            }
                        }
                        $state.go("app.distance", {}, { reload: true });
                    })



                    console.log(position);

                }).catch(function (err) {

                    alert("Error, check your internet connection or gps device!" + err[0]);
                })
 
            window.localStorage.setItem("lat", lat);
            window.localStorage.setItem("long", long);

        }

               $scope.callNumber = function (number) {
                    document.location.href = "tel:"+number;
               
                }

        $scope.addNotification = function (id) {
            var query = "SELECT * from events where id = ?";
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) {
                var alarmTime = new Date(res.rows.item(0).date);
                cordova.plugins.notification.local.schedule({
                    id: $scope.id,
                    date: alarmTime,
                    message: res.rows.item(0).title,
                    icon: 'res://logo.png',
                    title: "Sukošan"
                });
                  var query = "UPDATE events set notification="+alarmTime;
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, []).then(function (res) {});
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



        $scope.events = [];
        $scope.items;

        document.addEventListener('deviceready', function () {
            var query = "SELECT * FROM favorites";

            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                console.log("komada: " + res.rows.length);
                if (res.rows.length > 0) {
                    console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).latitude);
                    var request = $http({
                        method: "POST",
                        url: 'http://appeventnet.com/rest/allevents.php',
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
                                        date: data[v]["date"],
                                        latitude: data[v]["latitude"],
                                        longitude: data[v]["longitude"],
                                        images: data[v]["images"],
                                        phone: data[v]["phone"],
                                        category: data[v]["category"],
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

    });