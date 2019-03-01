app.controller('fileWatchController', ['$scope', '$resource', '$interval', function ($scope, $resource, $interval) {
    $scope.update_data = function () {
        var Files = $resource('/api/files');

        Files.query(function (results) {
            if (results.length > 0) {
                $scope.files = results;
                if ($scope.selected_file == null) {
                    $scope.selected_file = $scope.files.slice(-1)[0];
                }
            } else {
                $scope.files = null;
                if ($scope.selected_file != null) {
                    $scope.selected_file = null;
                }
            }

        });
    };
    $scope.update_data();
    $interval($scope.update_data, 3000);

    $scope.select_file = function (file) {
        $scope.selected_file = file;
    };

    $scope.is_file_selected = function (file) {
        return $scope.selected_file._id === file._id;
    };

}]);

