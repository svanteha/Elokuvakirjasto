// Toteuta moduulisi tänne
var ElokuvakirjastoApp = angular.module('ElokuvakirjastoApp', ['ngRoute', 'firebase']);

ElokuvakirjastoApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);

ElokuvakirjastoApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html'
            })
            .when('/login', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html'
            })
            .when('/movies', {
                controller: 'ListMoviesController',
                templateUrl: 'app/views/list_movies.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/add_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:KEY', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/show_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:KEY/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/search', {
                controller: 'APIController',
                templateUrl: 'app/views/search_movies.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});

ElokuvakirjastoApp.run(function (AuthenticationService, $rootScope) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});