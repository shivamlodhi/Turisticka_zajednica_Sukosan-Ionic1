// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Sukosan', ['ionic', 'ionic-datepicker', 'starter.controllers', 'ngCordova', 'ionic-timepicker','ngMap'])

  .run(function ($ionicPlatform, $http, $cordovaSQLite,$state) {
    $ionicPlatform.ready(function () {
      console.log("loada se APP.js"); 


         var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
      
      $cordovaSQLite.execute(db, "CREATE TABLE if not exists favorites (id integer primary key, title text,day text, date Date, description text, favorit integer,notification integer)").then(function (res) {
     
      }, function (err) {
        console.error("DASD?" + err[0]);
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
        url: '/favorit',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/favorites.html',
            controller: 'FavoritesCtrl'
          }
        }
      })


        .state('app.home2', {
        url: '/home2',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/homeCalendar.html',
            controller: 'EventsCtrl'
          }
        }
      })
   

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home2');
  });
