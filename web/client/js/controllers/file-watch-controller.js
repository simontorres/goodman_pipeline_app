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

    $scope.optimize_number_of_pages = function() {
        if ($scope.totalPages < 6) {
            $scope.pagesToShow = $scope.allPagesNumbers;
        } else {
          var first_half = $scope.allPagesNumbers
                .slice(Math.max($scope.allPagesNumbers[0] - 1, $scope.currentPageNumber - 3),
                    Math.min($scope.currentPageNumber + 3, $scope.currentPageNumber));

            var second_half = $scope.allPagesNumbers
                .slice(Math.max($scope.currentPageNumber, $scope.currentPageNumber - 3),
                    Math.min($scope.currentPageNumber + 3, $scope.allPagesNumbers.slice(-1)[0]));

            $scope.pagesToShow = first_half.concat(second_half);

        }
        $scope.pagesToShow = new Array(...new Set($scope.pagesToShow));

        if ($scope.pagesToShow[0] !== 1) {
            $scope.pagesToShow.unshift('...');
        };

        if ($scope.pagesToShow.slice(-1)[0] !== $scope.allPagesNumbers.slice(-1)[0]) {
            $scope.pagesToShow.push('...');
        };

        $scope.pagesToShow.push('Last');
        $scope.pagesToShow.unshift('First');
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
            $scope.optimize_number_of_pages();
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
        if (typeof page == "number") {
            $scope.currentPageNumber = page;
        } else if (page === 'First') {
            $scope.currentPageNumber = $scope.allPagesNumbers[0];
        } else if (page === 'Last') {
            $scope.currentPageNumber = $scope.allPagesNumbers.slice(-1)[0];
        }
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
