// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Sukosan', ['ionic', 'ionic-datepicker', 'starter.controllers', 'ngCordova', 'ionic-timepicker', 'ngMap', 'pascalprecht.translate'])

  .run(function ($ionicPlatform, $http, $cordovaSQLite, $state, $translate) {
    window.localStorage.setItem("start", 2)
    if (window.localStorage.getItem("language") == null || window.localStorage.getItem("language") == "") {
      window.localStorage.setItem("language", "en");

    }
    $translate.use(window.localStorage.getItem("language"));
    $ionicPlatform.ready(function () {
      console.log("loada se APP.js");


      var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });


      $cordovaSQLite.execute(db, "CREATE TABLE if not exists favorites (id integer primary key, title text,day text, date Date, description text, favorit integer,notification integer)").then(function (res) {

      }, function (err) {
        console.error("DASD?" + err[0]);
      });
      $cordovaSQLite.execute(db, "CREATE TABLE if not exists notifications (id integer primary key, hour text)").then(function (res) {
      }, function (err) {
        console.error("DASD?" + err[0]);
      });
      var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });

      $cordovaSQLite.execute(db, "CREATE TABLE if not exists events (id integer primary key, title text,day text, date Date, description text, favorit integer,notification integer)").then(function (res) {

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



  .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

    $translateProvider.translations('hr', {
      events: "DOGAĐANJA",
      dolazak:"Dolazak",
      odlazak:"Odlazak",
      //events actions

      guide: "Vodič",
      enterDate: "Unesite početni i završni datum svog boravka kako bi se prikazala aktualna događanja",
      from: "Od",
      to: "Do",
      skip: "PRESKOČI",
      next: "Nastavi",
      welcome: "Dobrodošli",


      remove: "Obriši",
      save: "Spremi",
      remind: "Podsjeti me",
      Share: "Dijeli",

      //meni
      favorites: "FAVORITI",
      favoritesMeni: "favoriti",
      setings: "postavke",
      Setings: "Postavke",
      Settings: "POSTAVKE",
      setings: "postavke",
      food_drinks: "hrana & pića",
      service: "usluge",

      //settings
      rec_not: "Primanje notifikacija",
      location: "lokacija",
      language: "Jezik",
      cancel: "Otkaži",
      date: "Datumi posjete",
      call:"Zovi",

      //notification
      notifications: "NOTIFIKACIJE",
      enter: "Postavi sate",
      setnot: "Postavi notifikaciju",

      events_malo: "Događanja",
      beachs: "Plaže",
      culture: "Znamenitosti",

      restaurants: "Restorani",
      bars: "Barovi",
      usefull_infos: "Korisne info",
      nautika: "Nautika",
      food: "Hrana i pića",
      services: "Servisi",


      RESTAURANTS: "RESTORANI",
      BARS: "BAROVI",
      USEFULL: "KORISNE INFO",
      NAUTIKA: "NAUTIKA",
      FOOD: "HRANA I PIĆE",
      SERVICES: "SERVISI",


      BEACHES: "PLAŽE",
      SIGHTS: "ZNAMENITOSTI"


    });


    $translateProvider.translations('it', {
      events: "EVENTI",
      dolazak:"Arrivo",
      odlazak:"Partenza",
      //events actions

      guide: "Guidare",
      enterDate: "Inserisci le date di inizio e fine del tuo soggiorno per mostrare gli eventi attuali",
      from: "Da",
      to: "A",
      skip: "SALTA",
      welcome: "Benvenuto",






      remove: "Rimuovere",
      save: "Salvare",
      remind: "Ricordami",
      Share: "Condividere",
      call:"Chiamata",

      //meni
      favorites: "PREFERITI",
      favoritesMeni: "preferiti",
      Setings: "Impostazioni",
      Settings: "IMPOSTAZIONI",

      setings: "impostazioni",
      food_drinks: "cibi e bevande",
      service: "servizi",

      date: "Data della visita",
      //settings
      rec_not: "Ricezione di notifiche",
      location: "luogo",
      language: "Lingua",
      //notification
      notifications: "NOTIFICHE",
      enter: "Ore set",
      setnot: "Notifica set",

      events_malo: "Eventi",
      beachs: "Spiaggia",
      culture: "Viste",

      restaurants: "Ristoranti",
      bars: "Bar",
      usefull_infos: "Utile info",
      nautika: "navigazione",

      food: "Cibi e bevande",
      services: "Servizi",

      RESTAURANTS: "RISTORANTI",
      BARS: "BAR",
      USEFULL: "UTILE INFO",
      NAUTIKA: "NAVIGAZIONE",
      FOOD: "CIBI E BEVANDE",
      SERVICES: "SERVIZI",

      BEACHES: "SPIAGGIA",
      SIGHTS: "VISTE"




    });


    $translateProvider.translations('en', {
      dolazak:"Dolazak",
      odlazak:"Odlazak",

      guide: "Guide",
      enterDate: "Enter start and end date of your stay display of current events",
      from: "From",
      to: "To",
      skip: "SKIP",
      next: "NEXT",
      welcome: "Welcome",

      events: "EVENTS",
      remove: "Remove",
      save: "Save",
      remind: "Remind me",
      Share: "Share",


      //meni
      favorites: "FAVORITES",
      favoritesMeni: "Favorites",
      setings: "settings",
      Setings: "Settings",
      Settings: "SETTINGS",
      date: "Dates of visit",
      favoritesMeni: "favorites",
      food_drinks: "food & drinks",
      service: "services",
      //settings
      rec_not: "Receiveing notifications",
      location: "location",
      language: "Language",
      //notification
      notifications: "NOTIFICATIONS",
      enter: "Set the hours",
      setnot: "Set notification",
      call:"Call",

      events_malo: "Events",
      beachs: "Beaches",
      culture: "Culture",

      restaurants: "Restaurants",
      bars: "Bars",
      usefull_infos: "Useful infos",
      nautika: "Navigation",

      food: "Food and Drinks",
      services: "Services",

      RESTAURANTS: "RESTAURANTS",
      BARS: "BARS",
      USEFULL: "USEFUL INFOS",
      NAUTIKA: "NAVIGATION",
      FOOD: "FOOD&DRINKS",
      SERVICES: "SERVICES",

      BEACHES: "BEACHES",
      SIGHTS: "SIGHTS"



    });


    $translateProvider.translations('de', {



      dolazak:"Kommen",
      odlazak:"Abfahrt",
      guide: "Führen",
      enterDate: "Geben Sie das Start- und Enddatum Ihres Aufenthalts ein. Anzeige der aktuellen Ereignisse",
      from: "Von",
      to: "Nach",
      skip: "ÜBERSPRINGEN",
      welcome: "Willkommen",

      events: "GESCHEHEN",
      remove: "Entfernen",
      save: "Sparen",
      remind: "Erinnere mich",
      Share: "Aktie",
      call:"Anruf",

      //meni
      favorites: "FAVORITEN",
      favoritesMeni: "favoriten",
      Setings: "Einstellungen",
      Settings: "EINSTELLUNGEN",
      date: "Datum des Besuchs",


      setings: "einstellungen",
      food_drinks: "essen&trinken",
      service: "dienstleist",
      //settings
      rec_not: "Empfangen von Benachr.",
      location: "Lage",
      language: "Sprache",
      //notification
      notifications: "BENACHRICH",
      enter: "set Stunden",
      setnot: "set Benachrichtigung",

      events_malo: "Geschehen",
      beachs: "Strand",
      culture: "Kultur",

      restaurants: "Restaurants",
      bars: "Bars",
      usefull_infos: "Nützliche Infos",
      nautika: "Navigation",

      food: "Essen/Trink.",
      services: "Dienstleist.",

      RESTAURANTS: "RESTAURANTS",
      BARS: "BARS",
      USEFULL: "NUTZLICHE INFOS",
      NAUTIKA: "NAVIGATION",
      FOOD: "ESSEN&TRINKEN",
      SERVICES: "DIENSTLEIST",

      BEACHES: "STRAND",
      SIGHTS: "KULTUR"



    });



    $translateProvider.preferredLanguage(window.localStorage.getItem("language"));
    $translateProvider.fallbackLanguage(window.localStorage.getItem("language"));



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

      .state('app.beaches', {
        url: '/beaches',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/beaches_sights.html',
            controller: 'BeachesAndSightsCtrl'
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

      .state('app.distance', {
        url: '/distance',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/distanceMap.html',
            controller: 'DistanceCtrl'
          }
        }
      })
      .state('app.notifications', {
        url: '/notifications',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/notifications.html',
            controller: 'NotificationCtrl'
          }
        }
      })



      .state('app.settings', {
        url: '/settings',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('app.info', {
        url: '/info',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/info.html',
            controller: 'InfoCtrl'
          }
        }
      })

      .state('app.food', {
        url: '/food',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/food_and_drinks.html',
            controller: 'InfoCtrl'
          }
        }
      })

      .state('app.bars', {
        url: '/bars',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/food_and_drinks.html',
            controller: 'FoodAndDrinksCtrl'
          }
        }
      })

      .state('app.services_choice', {
        url: '/services_choice',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/services_choice.html',
            controller: 'InfoCtrl'
          }
        }
      })


      .state('app.restaurants', {
        url: '/restaurants',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/food_and_drinks.html',
            controller: 'FoodAndDrinksCtrl'
          }
        }
      })


      .state('app.guide', {
        url: '/guide',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/sukosan_guide.html',
            controller: 'CalendarCtrl'
          }
        }
      })

      .state('app.home2', {
        url: '/home2',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/homeCalendar.html',
            controller: 'EventsCtrl',
            controller: 'CalendarCtrl'
          }
        }
      })
      .state('app.home_food', {
        url: '/home_food',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/homeFood.html',
            controller: 'FoodAndDrinksCtrl',
          }
        }
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/guide');
  });
