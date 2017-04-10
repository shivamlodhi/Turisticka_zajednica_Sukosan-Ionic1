
angular.module('Sukosan')
    .controller('EventsCtrl', function ($scope, $rootScope, $http, $ionicPopup, $cordovaSQLite, $ionicPlatform, $state,$stateParams) {
        $scope.events;
        $scope.events = [];
        $scope.myPopup;
        $scope.title;
        $scope.id;
        $scope.text;
        $scope.date;
        window.localStorage.setItem("page", "Events");
        $scope.addFavorit = function (id ) { 
            $scope.id = id; 
            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup.html',
                scope: $scope,
            })

        }

        $scope.add = function () {
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
              var request = $http({
                method: "GET",
                url: 'http://www.sukosan.hr/rest/events.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) {
                for(var v=0;v<data.length;v++){
                    if(data[v]["id"]==$scope.id){
                        $scope.title=data[v]["title"];
                        $scope.date=data[v]["date"];
                        $scope.text=data[v]["text"];
                }
                }

            });
            var query = "INSERT INTO favorites (id, title,date,description) VALUES (?,?,?,?)";
            $cordovaSQLite.execute(db, query, [$scope.id, $scope.title, $scope.date, $scope.text]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.error(err[0]);
            });
            
            $scope.myPopup.close();
     
           
        }

        $ionicPlatform.ready(function () {
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS favorites (id integer primary key, title text, date text, description text)").then(function (res) {
                console.log("favoriti uspjeli: " + res.insertId);
            }, function (err) {
                console.error("DASD?" + err[0]);
            });


            var request = $http({
                method: "GET",
                url: 'http://www.sukosan.hr/rest/events.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) { 
                db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS events (id integer primary key, title text, date text, description text, favorit integer)").then(function (res) {
                    console.log("insertId: " + res.insertId);
                }, function (err) {
                    console.error("DASD?" + err[0]);
                });
                for (var v = 0; v < data.length; v++) {

                    var query = "INSERT INTO events (id, title, date, description, favorit) VALUES (?,?,?,?,?)";
                    $cordovaSQLite.execute(db, query, [data[v]["id"], data[v]["title"], data[v]["date"], data[v]["description"], 1]).then(function (res) {
                        console.log("INSERT ID -> " + res.insertId);
                    }, function (err) {
                        console.error(err);
                    });
                }




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
                                        });
                                    } else {
                                        for (var j = 0; j < res1.rows.length; j++) {
                                            if (res1.rows.item(j).id == res.rows.item(i).id) {
                                                console.log("aaaaaaaa");
                                                $scope.events.push({
                                                    id: res.rows.item(i).id,
                                                    title: res.rows.item(i).title,
                                                    date: res.rows.item(i).date,
                                                    text: res.rows.item(i).description,
                                                    favorit: "1",
                                                });
                                            } else {
                                                $scope.events.push({
                                                    id: res.rows.item(i).id,
                                                    title: res.rows.item(i).title,
                                                    date: res.rows.item(i).date,
                                                    text: res.rows.item(i).description,
                                                    favorit: "2",
                                                });
                                                console.log("bbbbbbbbbbbbb");
                                            }

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



                console.log(data);


            });
        });



        $scope.cancel = function () {
            $scope.myPopup.close();

        }


    });