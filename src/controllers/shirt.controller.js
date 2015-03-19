'use strict';

var app = angular.module('madEase')
  app.controller('ShirtCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    var ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/shirts');
    this.shirt = $firebaseObject(ref);  
      
    this.shirt.$loaded().then(function(data, key){
          console.log(data.shirts)
      }) 
});


//https://madease.firebaseio.com/closets/10153176300256303/-JkiCn2pNeiPzVu36s7y/content