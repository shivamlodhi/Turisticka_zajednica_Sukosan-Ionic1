
var app = angular.module('Sukosan')
    .controller('EventsCtrl', function ($scope,$cordovaSocialSharing, $ionicLoading, $rootScope, $http, $ionicPopup, $cordovaSQLite,$cordovaGeolocation, $cordovaLocalNotification, $ionicPlatform, $state, $stateParams, $translate) {

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


$scope.shareViaFacebook = function() { 
     $ionicLoading.show({ template: 'Connecting with Facebook, please wait! ', noBackdrop: true, duration: 3000 });
         $cordovaSocialSharing.canShareVia("facebook", "null", null, "http://www.sukosan.hr/").then(function(result) {
             $cordovaSocialSharing.shareViaFacebook("null", null, "http://www.sukosan.hr/");
         }, function(error) {
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
                    data: { id: "11", jezik: window.localStorage.getItem("language") },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                }); 

                             request.success(function (data) { 

                    for (var v = 0; v < data.length; v++) {
                      console.log(data[v]["id"]);
                            var query = "INSERT INTO events (id, title,date,description,favorit) VALUES (?,?,?,?,?)";
                     
                            $cordovaSQLite.execute(db, query, [data[v]["id"], data[v]["title"], data[v]["date"], "",1]).then(function (res) {
                                console.log("insertId: " + res.insertId);
                            }, function (err) {
                                console.error(err);
                            });
 
                    }


                });
                      }, function (err) {
        console.error("DASD?" + err[0]);
      });
      
            var goodDate=false;
            var query = "SELECT * FROM favorites";
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, query, []).then(function (res) {
                var request = $http({
                    method: "POST",
                    url: 'http://appeventnet.com/rest/events.php',
                    data: { id: "11", jezik: window.localStorage.getItem("language") },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

                });

                request.success(function (data) {
                     var from=window.localStorage.getItem("from");
                     var to=window.localStorage.getItem("to");
                     if(from==null){
                         from = "2010-1-1";
                     }
                       if(to==null){
                         to = "2110-1-1";
                     }

                    for (var i in data[0]) {
                    }
                    for (var v = 1; v < data.length; v++) {
                        if((new Date(data[v]["date"])>=new Date(from) && new Date(data[v]["date"])<=new Date(to))){

                       
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
                                        favorit: 2,
                                    });
                                    break;
                                }
                              

                            }
                            if (favorit == false && goodDate==false) {
                                goodDate=false;
                                $scope.events.push({
                                    id: data[v]["id"],
                                    title: data[v]["title"],
                                    date: data[v]["date"],
                                    text: data[v]["text"],
                                    images: data[v]["images"],
                                    latitude: data[v]["latitude"],
                                    longitude: data[v]["longitude"],
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
                                    favorit: 1,
                                });
                            }
                        }
                         }
                    }

                });


            });

            //leads to distance beetween user and event

            $scope.showMapPath = function (lat, long) {
                if(window.localStorage.getItem("gps")==null){
                    window.localStorage.setItem("gps","false");
                }
                  if(window.localStorage.getItem("gps")=="true"){ 
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


                window.localStorage.setItem("lat", lat);
                window.localStorage.setItem("long", long);
               
            }

            //adding favorite in database
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
                                $state.go("app.home", {}, { reload: true });
                            }, function (err) {
                                console.error(err);
                            });

                        }
                    }


                });




            }
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });

    


        });
 
        $scope.addFavorit = function (id, favorit) {
            $scope.id = id;
            $scope.favorit = favorit; 
            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup.html', 
                scope: $scope,
            })

        }


        $scope.addNotification = function (id) {  
            alert();
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
                  $cordovaSQLite.execute(db, query, [$scope.id,alarmTime]).then(function (res) { });
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

        /**
                    var get = true;
                    db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                    
                    var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS favorites (id integer primary key, title text, date Date, description text,notification integer)").then(function (res) {
                        console.log("favoriti uspjeli: " + res.insertId);
                    }, function (err) {
                        console.error("DASD?" + err[0]);
                    });
        
        
                    var query = "SELECT * FROM events";
                    db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                    $cordovaSQLite.execute(db, query, []).then(function (res) {
                        if (res.rows.length > 0) {
        
        
                            var query = "SELECT * FROM favorites";
                            $cordovaSQLite.execute(db, query, []).then(function (res1) {
                              
                                if (res.rows.length > 0) {
                                    console.log("SELECTEDaaaaaa -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        var istina = false;
                                        if (res1.rows.length == 0) {
                                            $scope.events.push({
                                                id: res.rows.item(i).id,
                                                title: res.rows.item(i).title,
                                                date: res.rows.item(i).date,
                                                text: res.rows.item(i).description,
                                                favorit: 2,
                                            });
                                        } else {
                                            var haveFavorit = false;
                                            for (var j = 0; j < res1.rows.length; j++) {
                                                if (res1.rows.item(j).id == res.rows.item(i).id) {
                                                    $scope.events.push({
                                                        id: res.rows.item(i).id,
                                                        title: res.rows.item(i).title,
                                                        date: res.rows.item(i).date,
                                                        text: res.rows.item(i).description,
                                                        favorit: 1,
        
                                                    });
                                                    haveFavorit = true;
                                                }
                                            }
                                            if (haveFavorit == false) {
                                                $scope.events.push({
                                                    id: res.rows.item(i).id,
                                                    title: res.rows.item(i).title,
                                                    date: res.rows.item(i).date,
                                                    text: res.rows.item(i).description,
                                                    favorit: 2,
                                                });
        
                                            }
                                        }
                                    }
                                } else {
                                    console.log("No results found");
                                }
                                console.log("udri:" + $scope.events.length);
                            }, function (err) {
                                console.error("error=>" + err);
                            });
        
        
                            console.log("SELECTEDaaaaaa -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
        
                        } else {
                            console.log("No results found");
                        }
                        console.log("udri:" + $scope.events.length);
                    }, function (err) {
                        console.error("error=>" + err);
                    });
        
         */


        $scope.cancel = function () {
            $scope.myPopup.close();

        }



        $scope.go = function (id) {
            $state.go('app.detail', { eventId: id })
        }

    });


