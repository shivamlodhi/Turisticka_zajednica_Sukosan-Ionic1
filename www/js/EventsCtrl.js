
angular.module('Sukosan')
    .controller('EventsCtrl', function ($scope, $rootScope, $http) {
        $scope.events;

        document.addEventListener('deviceready', function () {
            var db = null;
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            db.sqlBatch([
                "CREATE TABLE IF NOT EXISTS favorites (  id int(4) NOT NULL primary key,  title varchar(32)  DEFAULT NULL,  county int(4) DEFAULT NULL)", ['INSERT INTO cities VALUES (?,?,?)', [101, 'Alice', 101]],
                ['INSERT INTO cities VALUES (?,?,?)', [11, 'Zagreb', 202]],
                ['INSERT INTO cities VALUES (?,?,?)', [211, 'Dugo selo', 202]],
            ], function () {
                console.log('Populated database OK');
            }, function (error) {
                console.log('SQL batch ERROR: ' + error.message);
            });

          

        });
        var request = $http({
            method: "POST",
            url: 'http://glutenfree.hr/rest/categories.php',
            data: { city: '1', category: '3' },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            $scope.events = data;
            console.log(data);


        });
    });