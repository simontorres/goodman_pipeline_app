app.controller('fileWatchController', ['$scope', '$resource', '$interval', function ($scope, $resource, $interval) {

    $scope.update_data = function () {
        var Files = $resource('/api/rawdata');

        Files.query(function (results) {
            $scope.files = results;
            console.log('Updating');
        });
    };
    $scope.update_data();
    $interval($scope.update_data, 3000);
}]);