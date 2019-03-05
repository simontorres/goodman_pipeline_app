app.controller('fileWatchController', ['$scope', '$resource', '$interval', function ($scope, $resource, $interval) {
    $scope.update_data = function () {
        var Files = $resource('/api/files');

        Files.query(function (results) {
            if (results.length > 0) {
                $scope.files = results.reverse();
                if ($scope.selected_file == null) {
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
    $scope.update_data();
    $interval($scope.update_data, 3000);

    $scope.select_file = function (file) {
        $scope.selected_file = file;
    };

    $scope.is_file_selected = function (file) {
        return $scope.selected_file._id === file._id;
    };

}]);

app.controller('fileListPaginationController', function($scope) {
    $scope.currentPageNumber = 1;
    $scope.currentPage = [];
    $scope.itemsPerPage = 14;
    $scope.totalPages = Math.ceil($scope.files.length / $scope.itemsPerPage);
    $scope.allPagesNumbers = [];
    $scope.allPages = [];

    $scope.create_pages = function () {
        var i;
        var startPage = 0;
        var endPage = startPage + $scope.itemsPerPage;
        for (i = 1; i <= $scope.totalPages; i++) {
            $scope.allPagesNumbers.push(i);
            $scope.allPages.push($scope.files.slice(startPage, endPage));
            startPage = endPage;
            endPage = startPage + $scope.itemsPerPage;


        }
    };

    $scope.select_page = function (page) {
        $scope.currentPageNumber = page;
        $scope.currentPage = $scope.allPages[page - 1];
    };

    $scope.is_page_active = function (page) {
        return $scope.currentPageNumber === page;
    };

    $scope.create_pages();
    $scope.select_page($scope.currentPageNumber);






});
