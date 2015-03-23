'use strict';

var app = angular.module('madEase')
  app.controller('ClosetCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    var ref = new Firebase('https://madease.firebaseio.com/closets/' + $stateParams.userId + '/' + $stateParams.closetId);
    this.info = $firebaseObject(ref); 
    
      console.log(this.info);
        
});