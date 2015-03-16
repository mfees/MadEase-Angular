'use strict';

angular.module('madEase')
  .controller('NavCtrl', function (Auth) {
    var self = this;
    
    Auth.onAuth(function(user, authdUser){
        self.user = user;    
    });
  });
