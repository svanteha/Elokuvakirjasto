ElokuvakirjastoApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://elokuvakirjastoappi.firebaseio.com/');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    }

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    }

    this.addMovie = function (movie) {
        movies.$add(movie);
    }

    this.editMovie = function (movie) {
        movies.$save(movie);
    }

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    }
});

ElokuvakirjastoApp.service('APIService', function ($http) {
    this.findMovie = function (name, year) {
        return $http.get('http://www.omdbapi.com', {params: {s: name, y: year}});
    }
});

ElokuvakirjastoApp.service('AuthenticationService', function ($firebase, $firebaseAuth) {
    var firebaseRef = new Firebase('https://elokuvakirjastoappi.firebaseio.com/');
    var firebaseAuth = $firebaseAuth(firebaseRef);

    this.logUserIn = function (email, password) {
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
    };

    this.createUser = function (email, password) {
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
    };
    
    this.checkLoggedIn = function () {
        return firebaseAuth.$waitForAuth();
    };

    this.logUserOut = function () {
        firebaseAuth.$unauth();
    };

    this.getUserLoggedIn = function () {
        return firebaseAuth.$getAuth();
    };
});

