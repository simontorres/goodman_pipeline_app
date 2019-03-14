var app = angular.module('booksApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: '/views/index.view.html',
            controller: 'indexController'
        })
        .when("/settings", {
            templateUrl: '/views/settings.view.html',
            controller: "settingsController"
        })
        .when("/live", {
            templateUrl: '/views/live.view.html',
            controller: 'liveController'
        })
        .when("/signup", {
            templateUrl: '/views/signup.view.html',
            controller: 'signupController',
            data: {title: 'Signup'}
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});


// app.factory('authStatus', function () {
//     var status = false;
//
//     return {
//         getAuthStatus: function () {
//             return status;
//         },
//         setAuthStatus: function (newStatus) {
//             status = newStatus;
//         }
//     }
// });
