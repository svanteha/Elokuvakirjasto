ElokuvakirjastoApp.controller('ListMoviesController', function ($scope, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();

    $scope.removeMovie = function (movie) {
        FirebaseService.removeMovie(movie);
    }
});

ElokuvakirjastoApp.controller('AddMovieController', function ($scope, $location, FirebaseService) {
    $scope.addMovie = function () {
        var title = $scope.name_field;
        var director = $scope.director_field;
        var year = $scope.year_field;
        var description = $scope.description_field;

        if (title !== '' && director !== '' && year !== '' && description !== '' && title && director && year && description) {
            FirebaseService.addMovie({
                title: $scope.name_field,
                director: $scope.director_field,
                year: $scope.year_field,
                description: $scope.description_field
            })
            $location.path('/movies');
        }
    }
});

ElokuvakirjastoApp.controller('ShowMovieController', function ($scope, $routeParams, $location, FirebaseService) {

    FirebaseService.getMovie($routeParams.KEY, function (movie) {
        if (!movie) {
            $location.path('/');
        }
        $scope.movie = movie;

    });

});

ElokuvakirjastoApp.controller('EditMovieController', function ($scope, $routeParams, $location, FirebaseService) {
    FirebaseService.getMovie($routeParams.KEY, function (movie) {
        if (!movie) {
            $location.path('/');
        }
        
        $scope.movie = movie;
        $scope.edit_name_field = $scope.movie.title;
        $scope.edit_director_field = movie.director;
        $scope.edit_year_field = movie.year;
        $scope.edit_description_field = movie.description;

    });


    $scope.editMovie = function () {
        var title = $scope.edit_name_field;
        var director = $scope.edit_director_field;
        var year = $scope.edit_year_field;
        var description = $scope.edit_description_field;

        if (title !== '' && director !== '' && year !== '' && description !== '' && title && director && year && description) {
            $scope.movie.title = title;
            $scope.movie.director = director;
            $scope.movie.year = year;
            $scope.movie.description = description;

            FirebaseService.editMovie($scope.movie);
            $location.path('/movies/' + $scope.movie.$id);
        }
    }
});
