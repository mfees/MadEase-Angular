'use strict';

angular.module('madEase')
  .controller('LoginCtrl', function ($firebaseArray, $firebaseObject, Auth) {
    var userInfo = new Firebase('https://madease.firebaseio.com');
    
    this.fbLogin = Auth.fbLogin;
});