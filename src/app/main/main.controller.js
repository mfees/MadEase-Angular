'use strict';
  angular.module('madEase')
  .controller('MainCtrl', function (Auth, $firebaseObject, $firebaseArray) {
        var self = this;
      
        Auth.onAuth(function(user){
        self.user = user;
        console.log(user)
    });
      
        this.lastCloset = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id).limitToLast(1);
        this.recent = $firebaseArray(this.lastCloset);
      
        console.log(this.recent)

  });
