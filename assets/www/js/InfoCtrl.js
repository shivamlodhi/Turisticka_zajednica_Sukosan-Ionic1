angular.module('Sukosan')
    .controller('InfoCtrl', function ($scope, $stateParams, $http, ionicDatePicker, $filter,$state) {

        $scope.openState = function (state,id) {
            window.localStorage.setItem("category",id);
            $state.go(state);
        }


    })