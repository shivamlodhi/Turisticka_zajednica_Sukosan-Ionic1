
var app = angular.module('Sukosan')
    .controller('FoodAndDrinksCtrl', function ($scope, $cordovaSocialSharing, $ionicLoading, $rootScope, $http, $ionicPopup, $cordovaSQLite, $cordovaGeolocation, $cordovaLocalNotification, $ionicPlatform, $state, $stateParams, $translate) {

        console.log("loada se eventsCtrl");
        $scope.events;
        $scope.events = [];
        $scope.myPopup;
        $scope.title;
        $scope.images;
        $scope.id;
        $scope.text;
        $scope.date;
        $scope.hour;
        $scope.favorit = 3;
        if (window.localStorage.getItem("category") == 4) {
            $scope.title_cover = "RESTAURANTS";
        }
        if (window.localStorage.getItem("category") == 7) {
            $scope.title_cover = "BARS";
        }
        if (window.localStorage.getItem("category") == 5) {
            $scope.title_cover = "USEFUL INFO";
        }
        if (window.localStorage.getItem("category") == 6) {
            $scope.title_cover = "SAILING";
        }

        window.localStorage.setItem("start", "")
        $scope.shareViaFacebook = function (link) {
            $ionicLoading.show({ template: 'Connecting with Facebook, please wait! ', noBackdrop: true, duration: 3000 });
            $cordovaSocialSharing.canShareVia("facebook", "null", null, link).then(function (result) {
                $cordovaSocialSharing.shareViaFacebook("null", null, link);
            }, function (error) {
                alert("Facebook connection is not possible!")
            });
        }



        $ionicPlatform.ready(function () {
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, "DELETE from events where id>0").then(function (res) {
            }, function (err) {
                console.error("DASD?" + err[0]);
            });

            $cordovaSQLite.execute(db, "CREATE TABLE if not exists events (id integer primary key, title text,day text, date Date, description text, favorit integer,notification integer)").then(function (res) {


                var request = $http({
                    method: "POST",
                    url: 'http://appeventnet.com/rest/events.php',
                    data: { id: "11", category: window.localStorage.getItem("category"), jezik: window.localStorage.getItem("language") },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                });

                request.success(function (data) {

                    for (var v = 0; v < data.length; v++) {
                        var query = "INSERT INTO events (id, title,date,description,favorit) VALUES (?,?,?,?,?)";

                        $cordovaSQLite.execute(db, query, [data[v]["id"], data[v]["title"], data[v]["date"], "", 1]).then(function (res) {
                            console.log("insertId: " + res.insertId);
                        }, function (err) {
                            console.error(err);
                        });

                    }


                });
            }, function (err) {
                console.error("DASD?" + err[0]);
            });

            var goodDate = false;
            var query = "SELECT * FROM favorites";
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                var request = $http({
                    method: "POST",
                    url: 'http://appeventnet.com/rest/events.php',
                    data: { id: "11", category: window.localStorage.getItem("category"), jezik: window.localStorage.getItem("language") },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                });

                request.success(function (data) {
                    for (var v = 0; v < data.length; v++) {
                        if (res.rows.length > 0) {
                            var favorit = false;

                            for (var i = 0; i < res.rows.length; i++) {

                                if (res.rows.item(i).id == data[v]["id"]) {
                                    favorit = true;
                                    $scope.events.push({
                                        id: data[v]["id"],
                                        title: data[v]["title"],
                                        date: data[v]["date"],
                                        text: data[v]["text"],
                                        images: data[v]["images"],
                                        latitude: data[v]["latitude"],
                                        longitude: data[v]["longitude"],
                                        phone:  data[v]["phone"],
                                        link: data[v]["link"],
                                        address: data[v]["address"],
                                        favorit: 2,
                                    });

                                    break;
                                }


                            }
                            if (favorit == false) {
                                $scope.events.push({
                                    id: data[v]["id"],
                                    title: data[v]["title"],
                                    date: data[v]["date"],
                                    text: data[v]["text"],
                                    images: data[v]["images"],
                                    latitude: data[v]["latitude"],
                                    longitude: data[v]["longitude"],
                                    link: data[v]["link"],
                                    phone:  data[v]["phone"],
                                    address: data[v]["address"],
                                    favorit: 1,

                                });
                            }
                        } else {
                            for (var v = 0; v < data.length; v++) {
                                $scope.events.push({
                                    id: data[v]["id"],
                                    title: data[v]["title"],
                                    date: data[v]["date"],
                                    text: data[v]["text"],
                                    images: data[v]["images"],
                                    latitude: data[v]["latitude"],
                                    longitude: data[v]["longitude"],
                                    phone: data[v]["phone"],
                                    link: data[v]["link"],
                                    address: data[v]["address"],
                                    favorit: 1,
                                });

                            }
                        }
                    }

                });


            });

            //leads to distance beetween user and event

                $scope.callNumber = function (number) {
                    document.location.href = "tel:"+number;
               
                }


            $scope.showMapPath = function (lat, long) {
                if (window.localStorage.getItem("gps") == null) {
                    window.localStorage.setItem("gps", "false");
                }
                if (window.localStorage.getItem("gps") == "false") {
                    alert("Turn on the gps in Settings");
                    return;
                }
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

            //adding favorite in database
            $scope.addFavorits = function (id) {

                var request = $http({
                    method: "POST",
                    url: 'http://appeventnet.com/rest/events.php',
                    data: { id: "11", jezik: "hr", category: window.localStorage.getItem("category") },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                });

                request.success(function (data) {


                    for (var v = 0; v < data.length; v++) {
                        if (data[v]["id"] == id) {
                            $scope.title = data[v]["title"];
                            $scope.date = data[v]["date"];
                            $scope.text = data[v]["text"];
                            var query = "INSERT INTO favorites (id, title,date,description,notification) VALUES (?,?,?,?,?)";
                            $cordovaSQLite.execute(db, query, [id, $scope.title, $scope.date, $scope.text, "2"]).then(function (res) {
                                $state.go($state.current, {}, { reload: true });
                            }, function (err) {
                                console.error(err);
                            });

                        }
                    }


                });




            }
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });






            $scope.addFavorit = function (id, favorit) {
                $scope.id = id;
                $scope.favorit = favorit;
                $scope.myPopup = $ionicPopup.show({
                    templateUrl: 'templates/popup.html',
                    scope: $scope,
                })
            }


            $scope.addNotification = function (id) {

                if ($scope.hour < 0 || $scope.hour > 25) {
                    alert("error");
                }
                var query = "SELECT * from events where id = ?";
                var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) {
                    var alarmTime = new Date(res.rows.item(0).date);
                    alarmTime.setHours($scope.hour);

                    cordova.plugins.notification.local.schedule({
                        id: $scope.id,
                        date: alarmTime,
                        message: res.rows.item(0).title,
                        icon: 'res://logo.png',
                        title: "Sukošan"
                    });

                    var query = "INSERT INTO notifications (id, hour) VALUES (?,?)";
                    $cordovaSQLite.execute(db, query, [$scope.id, alarmTime]).then(function (res) {
                    });
                }, function (err) {
                    console.error(err[0]);
                });
                $scope.myPopup.close();


            }

            $scope.remove = function (id) {
                var query = "DELETE from favorites where id = ?";
                var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                $cordovaSQLite.execute(db, query, [id]).then(function (res) {
                    console.log("insertId: " + res.insertId);
                }, function (err) {
                    console.error(err[0]);
                });

                $state.go($state.current, {}, { reload: true });


            }
            $scope.stisni = function () {

                $state.go($state.current, {}, { reload: true });

            }
            $scope.stisni2 = function () {

                $state.go($state.current, {}, { reload: true });

            }




            $scope.addRemind = function () {

            }



            $scope.cancel = function () {
                $scope.myPopup.close();

            }



            $scope.go = function (id) {
                $state.go('app.detail', { eventId: id })
            }
        });
    });


