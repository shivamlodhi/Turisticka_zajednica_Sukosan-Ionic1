
angular.module('Sukosan')
    .controller('FavoritesCtrl', function ($scope, $rootScope, $http) {
        $scope.favoriti;
        var request = $http({
            method: "POST",
            url: 'http://glutenfree.hr/rest/categories.php',
            data: { city: '1', category: '5' },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {


        });
    });