app.controller('fileWatchController', ['$scope', '$resource', '$interval', function ($scope, $resource, $interval) {
    $scope.follow = true;
    $scope.pagination = {
        // show: false,
        currentPage: 1,
        maxSize: 6,
        itemsPerPage: 14,
        pageStart: 0,
        pageEnd: 14
    };

    $scope.update_data = function () {
        var Files = $resource('/api/files');

        Files.query(function (results) {
            if (results.length > 0) {
                $scope.files = results.slice().reverse();

                if ($scope.selected_file == null || $scope.follow) {
                    $scope.selected_file = $scope.files[0];
                }
            } else {
                $scope.files = null;
                if ($scope.selected_file != null) {
                    $scope.selected_file = null;
                }
            }

        });

    };

    $scope.pageChanged = function () {
        $scope.pagination.pageStart = ($scope.pagination.currentPage - 1 ) * $scope.pagination.itemsPerPage;
        $scope.pagination.pageEnd = $scope.pagination.pageStart + $scope.pagination.itemsPerPage;
    };


    $scope.select_file = function (file) {
         $scope.follow = false;
         $scope.selected_file = file;
    };

    $scope.is_file_selected = function (file) {
        return $scope.selected_file._id === file._id;
    };

    $scope.activate_follow = function() {
        $scope.follow = !$scope.follow;
    };


    $interval($scope.update_data, 3000);

}]);
