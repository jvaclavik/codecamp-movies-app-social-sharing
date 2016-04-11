app.factory('ContactsService', function ($http, APP_CONFIG, $q) {
    return new (function () {
        var service = this;
        service.data = {};


        service.filterContacts = function(contacts){
            var filteredContacts = [];
            angular.forEach(contacts, function(contact){
                if(contact.name && contact.name.familyName && contact.name.givenName
                    && contact.emails && contact.emails.length > 0) filteredContacts.push(contact);
            })
            return filteredContacts;
        };

        service.getContacts = function (callback) {
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;
            options.desiredFields = [navigator.contacts.fieldType.displayName,
                navigator.contacts.fieldType.name,
                navigator.contacts.fieldType.emails];

            var promise = $q.defer();
            navigator.contacts.find(["*"], function(contacts){
                promise.resolve(service.filterContacts(contacts));
            }, function(e){
                console.error("error", e)
                promise.reject();
            }, options);
            return promise.promise;
        };

    })();
});
