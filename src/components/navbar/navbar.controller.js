'use strict';

angular.module('madEase')
  .controller('NavCtrl', function (Auth) {
    var self = this;
    
    this.logout = Auth.logout;
    
    Auth.onAuth(function(user, authdUser){
        self.user = user;    
        
    console.log(user);    
    });
  });
