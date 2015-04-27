ElokuvakirjastoApp.controller('ListMoviesController', function ($scope, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
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
