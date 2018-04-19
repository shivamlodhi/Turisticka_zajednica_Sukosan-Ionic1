angular.module('Sukosan')
  .controller('CalendarCtrl', function ($scope, $stateParams, $http, ionicDatePicker, $filter, $translate) {
    var areDatesSet = false;
    $translate('skip').then(function (translation) {
      $scope.skip = translation;
    }, function (translationId) {

    });
    if (window.localStorage.getItem("to") == null) {
      $translate('odlazak').then(function (translation) {
        $scope.to = translation;
      }, function (translationId) {
        $scope.headline = translationId;

      });
    } else {
      areDatesSet = true; 
        $scope.to = window.localStorage.getItem("toString"); 
    }
    if (window.localStorage.getItem("from") == null) {
      $translate('dolazak').then(function (translation) {
        $scope.from = translation;
      }, function (translationId) {
        $scope.headline = translationId;

      });
    } else {
      if (areDatesSet == true) {
        $translate('next').then(function (translation) {
          $scope.skip = translation;
        }, function (translationId) {

        });
      } else {
        $translate('skip').then(function (translation) {
          $scope.skip = translation;
        }, function (translationId) {

        });
      } 
        $scope.from = window.localStorage.getItem("fromString"); 
    }


    if (window.localStorage.getItem("notifications") == null) {
      $scope.click = 'red';
      window.localStorage.setItem("notifications", "red");
    } else {  
      $scope.click = window.localStorage.getItem("notifications");

    }

    var ipObj2 = {
      callback: function (val) {  //Mandatory  
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        window.localStorage.setItem("to", new Date(val).toDateString());
        window.localStorage.setItem("toString", $filter('date')(new Date(val), 'dd-MM-yyyy')); 
          $scope.to = $filter('date')(new Date(val), 'dd-MM-yyyy'); 
        if (window.localStorage.getItem("from") != null && window.localStorage.getItem("to") != null) {
          $translate('next').then(function (translation) {
            $scope.skip = translation;
          }, function (translationId) {
          });
        }

      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2100, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'modal'       //Optional
    };

    $scope.openDatePicker2 = function () {
      ionicDatePicker.openDatePicker(ipObj2);
    };




    var ipObj1 = {
      callback: function (val) {  //Mandatory 
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        window.localStorage.setItem("from", new Date(val).toDateString());
        window.localStorage.setItem("fromString", $filter('date')(new Date(val), 'dd-MM-yyyy')); 
          $scope.from =  $filter('date')(new Date(val), 'dd-MM-yyyy'); 
        if (window.localStorage.getItem("from") != null && window.localStorage.getItem("to") != null) {
          $translate('next').then(function (translation) {
            $scope.skip = translation;
          }, function (translationId) {
          });
        }
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2100, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'modal'       //Optional
    };

    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

  })