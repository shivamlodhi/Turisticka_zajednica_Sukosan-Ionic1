angular.module('Sukosan')
    .controller('EventDetailCtrl', function ($scope, $stateParams, $http, $cordovaSQLite, $ionicPopup, $state, NgMap,$cordovaGeolocation, $ionicLoading, $cordovaSocialSharing) {
        $scope.location = "Sukosan";
        $scope.title = "Ribicke festice";
        $scope.description = "";
        $scope.date = "27.04.2017";
        $scope.favorit;
        $scope.id = $stateParams.eventId;
        $scope.myPopup; 
        $scope.latitude;
        $scope.longitude;
        $scope.images;
        $scope.link;
         db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
        var query = "select * from favorites where id = " + $scope.id;
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            if (res.rows.length == 1) {
                $scope.favorit = 2;
            }else{
                $scope.favorit = 1;
            }


        }); 
        console.log("aaaaaaaaaaaaaaaa");
        var request = $http({
            method: "POST",
            url: 'http://appeventnet.com/rest/events.php',
            data: { id: "11", jezik: window.localStorage.getItem("language") },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        });
       request.success(function (data) {
                for (var v in data[0]) {
                    console.log("Key: " + v)
                }
                for (var i = 0; i < data.length - 1; i++) {
                    if (data[i]["id"] == $stateParams.eventId) {
                        console.log("asdasd");
                        $scope.title = data[i]["title"];
                        $scope.description = data[i]["description"];
                        $scope.date = data[i]["date"];
                        $scope.longitude = data[i]["longitude"];
                        $scope.latitude = data[i]["latitude"];
                        $scope.images = data[i]["images"];
                         $scope.link = data[i]["link"];

                    }
                }
            });

        NgMap.getMap().then(function (map) {
     
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

      $scope.shareViaFacebook = function() { 
     $ionicLoading.show({ template: 'Connecting with Facebook, please wait! ', noBackdrop: true, duration: 3000 });
         $cordovaSocialSharing.canShareVia("facebook", "null", null, "http://www.sukosan.hr/").then(function(result) {
             $cordovaSocialSharing.shareViaFacebook("null", null, "http://www.sukosan.hr/");
         }, function(error) {
              alert(error)
        });
     }


        $scope.addFavorits = function (id) {

                var request = $http({
                    method: "POST",
                    url: 'http://appeventnet.com/rest/events.php',
                    data: { id: "11", jezik:  "hr" },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                });

                request.success(function (data) {


                    for (var v = 0; v < data.length; v++) {
                        if (data[v]["id"] == id) {
                            $scope.title = data[v]["title"];
                            $scope.date = data[v]["date"];
                            $scope.text = data[v]["text"];
                            var query = "INSERT INTO favorites (id, title,date,description,notification) VALUES (?,?,?,?,?)";
                            $cordovaSQLite.execute(db, query, [id, $scope.title, $scope.date, $scope.text,"2"]).then(function (res) {
                                $state.go("app.detail", {eventId: $scope.id}, { reload: true });
                            }, function (err) {
                                console.error(err);
                            });

                        }
                    }


                });




            }
     $scope.addFavorit = function (id, favorit) {
            $scope.id = id;
            $scope.favorit = favorit; 
            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup.html',
                controller: "EventDetailCtrl", 
                scope: $scope,
            })

        }
          $scope.addNotification = function (id) {  
           
            var query = "SELECT * from events where id = ?";
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) { 
                var alarmTime =new Date(res.rows.item(0).date);  
                 alarmTime.setHours(document.getElementById ( "hour" ).value);
                cordova.plugins.notification.local.schedule({
                    id: $scope.id,
                    date: alarmTime,
                    message: res.rows.item(0).title,
                    icon: 'res://logo.png',
                    title: "Sukošan"
                });

              var query = "INSERT INTO notifications (id, hour) VALUES (?,?)";
                  $cordovaSQLite.execute(db, query, [$scope.id,alarmTime]).then(function (res) {
                      
                  });
            }, function (err) {
                console.error(err[0]);
            });


            $scope.myPopup.close();



        }
              $scope.showMapPath = function ( ) { 
                if(window.localStorage.getItem("gps")==null){
                    window.localStorage.setItem("gps","false");
                }
                  if(window.localStorage.getItem("gps")=="false"){ 
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
                                 window.localStorage.setItem("lokacija",data[0].formatted_address)  
                            } else {
                                alert("No address available");
                            }
                        }
                    })
                             var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng($scope.latitude, $scope.longitude);
                    var request = {
                        latLng: latlng
                    };

                    geocoder.geocode(request, function (data, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (data[0] != null) {
                                var res = data[1].formatted_address;
                                var array = res.split(',');
                                $scope.lokacija = array[0]; 
                                 window.localStorage.setItem("lokacija2",data[0].formatted_address)  
                                console.log(data[1].formatted_address); ; 
                            } else {
                                alert("No address available");
                            }
                        }
                         $state.go("app.distance", {}, { reload: true });
                    })


                    
                    console.log(position);

                }).catch(function (err) {
                 
                alert("Error, check your internet connection or gps device!"+err[0]); 
                })


                window.localStorage.setItem("lat", $scope.latitude);
                window.localStorage.setItem("long", $scope.longitude);
               
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

    });