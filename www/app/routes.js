app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $resourceProvider, APP_CONFIG) {
    $httpProvider.interceptors.push('authInterceptorService');

    $stateProvider
        .state('movies', {
            url: '/movies',
            templateUrl: "views/movies/movies-list.html",
            controller: 'MoviesListCtrl'
        })
        //.state('movies-top-rated', {
        //    url: '/movies/top-rated',
        //    templateUrl: "views/movies/movies-list.html",
        //    controller: 'MoviesTopRatedCtrl'
        //})
        .state('movies-detail', {
            url: '/movies/:id',
            templateUrl: "views/movies/movies-detail.html",
            controller: 'MoviesDetailCtrl'
        });
        // states end
    ;

    $urlRouterProvider.otherwise("/movies");

});
