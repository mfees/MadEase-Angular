'use strict';
  angular.module('madEase')
  .controller('MainCtrl', function (Auth) {
      var self = this;
    Auth.onAuth(function(user){
        self.user = user;
        console.log(user)
    });
  });
