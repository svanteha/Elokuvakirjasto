// Toteuta moduulisi tänne
var ElokuvakirjastoApp = angular.module('ElokuvakirjastoApp', ['ngRoute', 'firebase']);

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
            .otherwise({
                redirectTo: '/'
            });
})