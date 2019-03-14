var app = angular.module('booksApp');

app.controller('mainController', function ($scope, $http, $uibModal, $location, $window) {
    $scope.showSignin = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/signin.view.html',
            controller: 'signinController',
            scope: $scope,
            resolve: {
                loginForm: function () {
                    return $scope.loginForm;
                }
            }
        });
        modalInstance.result.then(function (username) {
            $scope.username = username;
            // console.log($scope.username);
            $location.path('/live');
        });
    };

    $scope.isSignedIn = function () {
        return $window.localStorage.getItem('jwtToken') !== null;
    };

    $scope.signout = function () {
        $scope.username = null;
        $window.localStorage.removeItem('jwtToken');
        $window.localStorage.removeItem('userName');
        $location.path('/');
    };

    $scope.username = $window.localStorage.getItem('userName');
    // console.log($scope.username);



});

app.controller('indexController', function ($scope, $http, $location, $window) {
    console.log(' This is Index');
});

app.controller('signinController', function ($scope, $http, $location, $window, $uibModalInstance) {
    $scope.signinData = {
        username: '',
        password: ''
    };
    $scope.message = '';
    $scope.data = null;

    $scope.signin = function () {
        // console.log('signining in');
        $http({
            method: 'POST',
            url: '/api/signin',
            data: $scope.signinData
        }).then(function (res) {
            // console.log(res);
            if (res.data.success) {
                $window.localStorage.setItem('jwtToken', res.data.token);
                $window.localStorage.setItem('userName', $scope.signinData.username);
                $uibModalInstance.close($scope.signinData.username);

            } else {
                $scope.message = res.data.msg;
                $window.alert($scope.message);

            }
        }, function (err) {
            // console.log(err);
            $scope.message = err.data.msg;
        });

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }

});

app.controller('signupController', function ($scope, $http, $location, $window) {
    if ($window.localStorage.getItem('jwtToken')) {
        $window.localStorage.removeItem('jwtToken');
        $window.localStorage.removeItem('userName');
    }
    $scope.signupData = {
        username: '',
        password: ''
    };

    $scope.message = '';

    $scope.signup = function () {
        $http({
            method: 'POST',
            url: '/api/signup',
            data: $scope.signupData
        }).then(function (res) {
            // console.log(res);
            if (res.data.success) {
                $location.path('/');
            } else {
                $scope.message = res.data.msg;
            }
        }, function (err) {
            // console.log(err);
            $scope.message = err.error.msg;
        });
    };
});

app.controller('booksController', function ($scope, $http, $location, $window) {
    $scope.message = '';
    $scope.books = null;

    $scope.newBook = {};
    $scope.newBook.isbn = '';
    $scope.newBook.title = '';
    $scope.newBook.author = '';
    $scope.newBook.publisher = '';

    $http({
        method: 'GET',
        url: '/api/books',
        headers: {
            'Authorization': $window.localStorage.getItem('jwtToken')
        }
    }).then(function (res) {
        // console.log(res);
        if (res.data.success) {
            $scope.books = res.data.books;
        } else {
            $scope.message = res.data.msg;
        }
    }, function (err) {
        if (err.data === 'Unauthorized') {
            $scope.message = err.data;
            $location.path('/login');
        }

    });
    $scope.addBook = function () {
        $http({
            method: 'POST',
            url: '/api/books',
            data: $scope.newBook,
            headers: {
            'Authorization': $window.localStorage.getItem('jwtToken')}

        }).then(function (res) {
            if (res.data.success) {
                if ($scope.books) {
                    $scope.books.push($scope.newBook);
                } else {
                    $scope.books = [$scope.newBook];
                }

                $location.path('/books');
            } else {
                $scope.message = res.data.msg;
            }
        }, function (err) {
            // console.log(err);
            $scope.message = err.error.msg;
        });

    }
});


app.controller('liveController', function ($scope, $resource, $http, $location, $window) {
    $scope.follow = true;
    $scope.message = '';
    $scope.pagination = {
        // show: false,
        currentPage: 1,
        maxSize: 6,
        itemsPerPage: 14,
        pageStart: 0,
        pageEnd: 14
    };

    $scope.update_data = function () {
        $http({
            method: 'GET',
            url: '/api/files',
            headers: {
                'Authorization': $window.localStorage.getItem('jwtToken')
            }
        }).then(function (res) {
            // console.log(res);
            if (res.data.success) {
                $scope.files = res.data.files.slice().reverse();
                if ($scope.selected_file == null || $scope.follow) {
                    $scope.selected_file = $scope.files[0];
                }

            } else {
                $scope.message = res.data.msg;
                $scope.files = null;
                if ($scope.selected_file != null) {
                    $scope.selected_file = null;
                }
            }
        }, function (err) {
            // console.log(err);
            if (err.data === 'Unauthorized') {
                $scope.message = 'Unauthorized Access. Please Sign In.';
                $location.path('/');
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

    $scope.update_data();
});
