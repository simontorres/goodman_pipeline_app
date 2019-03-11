var app = angular.module('fileWatchApp', ['ngResource', 'ngAnimate', 'ui.bootstrap']);

app.filter('reverse', function() {
    return function (items) {
        return items.slice().reverse();
    };
});
