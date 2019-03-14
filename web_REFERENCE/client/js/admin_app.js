var app = angular.module('adminApp', ['ngResource']);

app.filter('reverse', function() {
    return function (items) {
        return items.slice().reverse();
    };
});