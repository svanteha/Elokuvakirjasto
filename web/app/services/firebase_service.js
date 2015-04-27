ElokuvakirjastoApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://elokuvakirjastoappi.firebaseio.com/');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    }
    
    this.addMovie = function(movie) {
        movies.$add(movie);
    }
});

