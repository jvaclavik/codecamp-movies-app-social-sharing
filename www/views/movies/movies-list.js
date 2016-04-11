app.controller('MoviesListCtrl', function ($scope, $state, GlobalService, MoviesService) {
    $scope.data = MoviesService.data;
})