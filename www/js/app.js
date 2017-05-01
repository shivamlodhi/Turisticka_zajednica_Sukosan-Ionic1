// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Sukosan', ['ionic', 'ionic-datepicker', 'starter.controllers', 'ngCordova', 'ionic-timepicker'])

  .run(function ($ionicPlatform, $http, $cordovaSQLite,$state) {
    $ionicPlatform.ready(function () {
      console.log("loada se APP.js");
      var request = $http({
        method: "POST",
        url: 'http://www.sukosan.hr/rest/updateUser.php',
        data: { push: window.localStorage.getItem("notificationsValue"), token: window.localStorage.getItem("token"), os: "android", pocetni: window.localStorage.getItem("fromString"), zavrsni: window.localStorage.getItem("toString") },

        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

      });
      request.success(function (data) { 
      console.log(data);
      });
      request.error(function (err) {

        console.log("ERROR: " + err);
      });
      
      var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
      
      $cordovaSQLite.execute(db, "CREATE TABLE if not exists events (id integer primary key, title text,day text, date Date, description text, favorit integer,notification integer)").then(function (res) {
     
      }, function (err) {
        console.error("DASD?" + err[0]);
      });
      var query = "DELETE from events where id>0";
            $cordovaSQLite.execute(db, query, []).then(function (res1) { 
               
            });
         var request = $http({
                        method: "GET",
                        url: 'http://www.sukosan.hr/rest/events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });
                    request.success(function (data) {


                        for (var v = 0; v < data.length; v++) { 
                            var query = "INSERT INTO events (id, title, date, description, favorit) VALUES (?,?,?,?,?)";
                            $cordovaSQLite.execute(db, query, [data[v]["id"], data[v]["title"], data[v]["date"], data[v]["description"], 1]).then(function (res) {
                                console.log("INSERT ID -> " + res.insertId);
                            }, function (err) {
                                console.error(err);
                            });
                        }
                           $state.go($state.current, {}, { reload: true });

                    });

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      window.FirebasePlugin.getToken(function (token) {
        // save this server-side and use it to push notifications to this device
         window.localStorage.setItem("token", token);
        var request = $http({
        method: "POST",
        url: 'http://www.sukosan.hr/rest/createUser.php',
        data: { token: token, os: "android" },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

      });
      request.success(function (data) {
        console.log(data[0]["user"]);
          window.localStorage.setItem("notificationsID", data[0]["user"]);
      });
        request.error(function (err) {

          console.log("ERROR: " + err);
        });


        console.log(token);
      }, function (error) {
        console.error(error);
      });

    });
  })




  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.detail', {
        cache: false,
        url: 'event/:eventId',
        views: {
          'menuContent': {
            templateUrl: 'templates/eventDetail.html',
            controller: 'EventDetailCtrl',
          }
        }
      })
      .state('app.home', {
        url: '/home',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'EventsCtrl'
          }
        }
      })
      .state('app.favorites', {
        url: '/favorites',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/favorites.html',
            controller: 'FavoritesCtrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  });
