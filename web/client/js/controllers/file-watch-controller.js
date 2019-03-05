app.controller('fileWatchController', ['$scope', '$resource', '$interval', function ($scope, $resource, $interval) {
    $scope.currentPageNumber = 1;
    $scope.currentPage = [];
    $scope.itemsPerPage = 14;
    $scope.follow = true;

    $scope.update_data = function () {
        var Files = $resource('/api/files');

        Files.query(function (results) {
            if (results.length > 0) {
                $scope.files = results.slice().reverse();
                $scope.create_pages();
                $scope.select_page($scope.currentPageNumber);

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

    $scope.create_pages = function () {
        // $scope.files = $scope.update_data();
        if ($scope.files != null) {
            $scope.totalPages = Math.ceil($scope.files.length / $scope.itemsPerPage);
            $scope.allPagesNumbers = [];
            $scope.allPages = [];
            var i;
            var startPage = 0;
            var endPage = startPage + $scope.itemsPerPage;
            for (i = 1; i <= $scope.totalPages; i++) {
                $scope.allPagesNumbers.push(i);
                $scope.allPages.push($scope.files.slice(startPage, endPage));
                startPage = endPage;
                endPage = startPage + $scope.itemsPerPage;


            }
        } else {
            console.log('files does not exist yet!');
        }

    };


     $scope.select_file = function (file) {
         $scope.follow = false;
         $scope.selected_file = file;
    };

    $scope.is_file_selected = function (file) {
        return $scope.selected_file._id === file._id;
    };

    $scope.select_page = function (page) {
        $scope.currentPageNumber = page;
        if ($scope.allPages != null) {
            $scope.currentPage = $scope.allPages[page - 1];
        }
    };

    $scope.is_page_active = function (page) {
        return $scope.currentPageNumber === page;
    };

    $scope.activate_follow = function() {
        $scope.follow = !$scope.follow;
    }

    // startup execution

    // $scope.create_pages();


    $interval($scope.update_data, 3000);

}]);
