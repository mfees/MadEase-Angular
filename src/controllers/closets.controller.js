'use strict';

var app = angular.module('madEase')
  app.controller('closetCtrl', function ($firebaseArray, $firebaseObject, Auth) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    var ref = new Firebase('https://madease.firebaseio.com/closet-names/' + self.user.$id);
    this.myCloset = $firebaseArray(ref);  
      
    this.newCloset = {
        closetTitle: "",
        subhead: ""
    };
      
    this.addCloset = function(c) {
        this.myCloset.$add(c);
        return this.newCloset = {
            closetTitle: "",
            subhead: ""
        };
    };
    
});