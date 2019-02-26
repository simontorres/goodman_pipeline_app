var app = angular.module('fileWatchApp', ['ngResource']);

app.filter('reverse', function() {
    return function (items) {
        return items.slice().reverse();
    };
});