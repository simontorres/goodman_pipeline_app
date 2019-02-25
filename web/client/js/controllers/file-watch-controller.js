app.controller('fileWatchController', ['$scope', '$resource', function ($scope, $resource) {
    var Files = $resource('http://ctioy9.ctio.noao.edu:4000/api/files');

    Files.query(function (results) {
        console.log(results);
        $scope.files = results;
        console.log("hello");

    })
}]);