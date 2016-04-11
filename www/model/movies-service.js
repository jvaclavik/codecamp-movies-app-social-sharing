app.factory('MoviesService', function ($http, APP_CONFIG) {
    return new (function () {
        var service = this;
        service.data = {};


        service.getMovies = function (callback) {
            var req = {
                method: "GET",
                url: APP_CONFIG.getApiUrl("moviesPopular")
            };
            return $http(req).success(function (response) {
                service.data.movies = response.results;
                if (callback) callback();
            }).error(function (data, status, headers, config) {
                console.error("error");
            });

        };


        service.getMovieById = function (id) {
            var selectedMovie = {};
            angular.forEach(service.data.movies, function (movie) {
                if (movie.id == id) selectedMovie = movie;
            });
            return selectedMovie;
        };


        service.watchedMovies = [];

        service.getWatchedMoviesFromStorage = function () {
            try {
                service.watchedMovies = JSON.parse(localStorage.getItem("watched_movies")) || [];
            } catch (e) {
                console.warn("Invalid JSON string")
            }
            return service.watchedMovies;
        };

        service.isMovieWatched = function (movieId) {
            return !!~service.watchedMovies.indexOf(movieId)
        };

        service.toggleWatched = function (id) {
            var occurenceIndex = service.watchedMovies.indexOf(id);
            if (~occurenceIndex)
                service.watchedMovies.splice(occurenceIndex, 1);
            else
                service.watchedMovies.push(+id);
            localStorage.setItem("watched_movies", JSON.stringify(service.watchedMovies));
        };


        service.promise = service.getMovies(function () {
            service.getWatchedMoviesFromStorage();
        });

    })();
});
