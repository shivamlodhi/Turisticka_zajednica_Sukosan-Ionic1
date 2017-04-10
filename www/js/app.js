// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Sukosan', ['ionic', 'ionic-datepicker', 'starter.controllers', 'ngCordova'])

  .run(function ($ionicPlatform, $http, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
      var get=true;
      db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
      var query = "SELECT * FROM events";
      $cordovaSQLite.execute(db, query, []).then(function (res1) {
        if (res1.rows.length > 0) { get=false;}});
        if(get==true){
        var request = $http({
          method: "GET",
          url: 'http://www.sukosan.hr/rest/events.php',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {

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
        });
        }

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
      });
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
