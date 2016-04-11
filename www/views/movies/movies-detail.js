app.controller('MoviesDetailCtrl', function ($scope, MoviesService, $stateParams, $ionicModal, ContactsService, GlobalService) {
    if($stateParams){
        var movieId = +$stateParams.id;
        MoviesService.promise.then(function(){
            $scope.movie = MoviesService.getMovieById(movieId);
        })
    }

    $scope.toggleWatched = function(){
        MoviesService.toggleWatched(movieId);
    };

    $scope.isMovieWatched = function () {
        return MoviesService.isMovieWatched(movieId);
    };


    $ionicModal.fromTemplateUrl('views/movies/contacts-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.contactsModal = modal;
    });


    $scope.share = function(type){
        switch(type){
            case "twitter":
                window.plugins.socialsharing.shareViaTwitter('I love this movie!! <3 ' + $scope.movie.title);
                break;
            case "email":
                GlobalService.loadingShow();
                ContactsService.getContacts().then(function(contacts){
                    $scope.contacts = contacts;
                    $scope.contactsModal.show();
                    GlobalService.loadingHide();
                });
                break;
        }
    };


    $scope.shareOnEmail = function(contact){
        var message = 'Dear '+contact.name.familyName+',\nI love this movie!! <3 '+ $scope.movie.title+'';
        window.plugins.socialsharing.shareViaEmail(
            message, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
            'Subject',
            [contact.emails[0].value], // TO: must be null or an array
            null, // BCC: must be null or an array
            null, // FILES: can be null, a string, or an array
            function(){ // Success callback
                $scope.contactsModal.hide();
            }
        );
    }
});
