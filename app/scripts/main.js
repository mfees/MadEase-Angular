/* jshint devel:true */
console.log('\'Allo \'Allo!');

//var firebaseRef = new Firebase(url);

//$(function() {
//    firebaseRef.set({
//        type: "fruit",
//        name: "apple",
//        price: 42.0
//    });
//});

'use strict';

app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
    var url = "https://madease.firebaseio.com";
    var ref = new Firebase(url);
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
        register: function (user) {
          return auth.$createUser(user.email, user.password);
        },
        login: function (user) {
          return auth.$login('password', user);
        },
        logout: function () {
          auth.$logout();
        },
        resolveUser: function() {
          return auth.$getCurrentUser();
        },
        signedIn: function() {
          return !!Auth.user.provider;
        },
        user: {}
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        console.log('logged in');
        angular.copy(user, Auth.user);
    });
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
        console.log('logged out');
        angular.copy({}, Auth.user);
    });

    return Auth;
});