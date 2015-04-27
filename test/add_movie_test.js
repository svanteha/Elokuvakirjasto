describe('Add movie', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('ElokuvakirjastoApp');

        FirebaseServiceMock = (function () {
            
            var movies = [
                {
                    title: 'Kaunis romassi',
                    director: 'Svante',
                    year: '1991',
                    description: 'Olipa kerran'
                },
                {
                    title: 'Testiä',
                    director: 'Jorma',
                    year: '1578',
                    description: 'Testataanpa vähän'
                }
            ];           
            return {
                // Toteuta FirebaseServicen mockatut metodit tähän
                getMovies: function() {
                    return movies;
                },
                addMovie: function(movie) {
                    movies.push(movie);
                }
            }
        })();

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('AddMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        scope.name_field = 'Testaus';
        scope.director_field = 'Testaus';
        scope.year_field = 'Testaus';
        scope.description_field = 'Testaus';
        scope.addMovie();
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        scope.addMovie();
        expect(FirebaseServiceMock.getMovies().length).toBe(2);
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
    });
});