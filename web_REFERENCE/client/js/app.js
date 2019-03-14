var app = angular.module('fileWatchApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap']);

app.filter('reverse', function() {
    return function (items) {
        return items.slice().reverse();
    };
});


app.config( function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: '/views/index.html'
        }).when("/signup", {
            templateUrl: '/views/signup.html'
    })
});
