// Toteuta moduulisi tänne
var ElokuvakirjastoApp = angular.module('ElokuvakirjastoApp', ['ngRoute', 'firebase']);

ElokuvakirjastoApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);

ElokuvakirjastoApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'ListMoviesController',
                templateUrl: 'app/views/list_movies.html'
            })
            .when('/movies', {
                controller: 'ListMoviesController',
                templateUrl: 'app/views/list_movies.html'
            })
            .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/add_movie.html'
            })
            .when('/movies/:KEY', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/show_movie.html'
            })
            .when('/movies/:KEY/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit_movie.html'
            })
            .when('/search', {
                controller: 'APIController',
                templateUrl: 'app/views/search_movies.html'
            })
            .otherwise({
                redirectTo: '/'
            });
})