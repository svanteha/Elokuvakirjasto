describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('ElokuvakirjastoApp');

        FirebaseServiceMock = (function () {

            return {
                // Toteuta FirebaseServicen mockatut metodit tähän
                getMovies: function () {
                    return movies;
                },
                addMovie: function (movie) {
                    movies.push(movie);
                },
                removeMovie: function (movie) {
                    movies.shift();
                },
                editMovie: function (movie) {
                    
                },
                getMovie: function (key, done) {
                    if (key === 'abc123') {
                        done({
                            title: 'Joku leffa',
                            director: 'Kalle Ilves',
                            year: 2015,
                            description: 'Mahtava leffa!'
                        });
                    } else {
                        done(null);
                    }
                }
            };
        })();

        RouteParamsMock = (function () {
            return {
                // Toteuta mockattu $routeParams-muuttuja tähän
                KEY: 'abc123'
            }
        })();

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('EditMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.edit_name_field).toBe('Joku leffa');
        expect(scope.edit_director_field).toBe('Kalle Ilves');
        expect(scope.edit_year_field).toBe(2015);
        expect(scope.edit_description_field).toBe('Mahtava leffa!');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();

    })

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.edit_name_field = 'moi';
        scope.edit_director_field = 'moi';
        scope.edit_year_field = 'moi';
        scope.edit_description_field = 'moi';
        scope.editMovie();
        expect(scope.movie.title).toBe('moi');
        expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.edit_name_field = '';
        scope.editMovie();
        expect(scope.movie.title).toBe('Joku leffa');
        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
    });
});