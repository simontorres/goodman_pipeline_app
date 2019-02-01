app.controller('fileWatchController', ['$scope', '$resource', function ($scope, $resource) {
    var Files = $resource('/api/files');

    Files.query(function (results) {
        $scope.files = results;
        console.log("hello");

    })
}]);