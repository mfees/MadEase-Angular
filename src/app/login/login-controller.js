'use strict';

angular.module('madEase')
  .controller('LoginCtrl', function ($firebaseArray, $firebaseObject, Auth) {
    var userInfo = new Firebase('https://madease.firebaseio.com/users');
    
    this.fbLogin = Auth.fbLogin;
    
//    function LoginCtrl (this) {
//        this.userName = "";
//        
//        this.login.fbLogin() = function () {
//            this.userInfo.push({userName:this.userName})
//        }
//    };
});