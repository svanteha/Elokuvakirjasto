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
            .otherwise({
                redirectTo: '/'
            });
})