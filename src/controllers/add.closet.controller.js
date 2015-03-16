'use strict';

var app = angular.module('madEase')
  app.controller('addCtrl', function ($firebaseArray, $firebaseObject, Auth) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    var closet = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id);
    this.myCloset = $firebaseArray(closet);  
      
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
    
//    function clothingCtrl () {
//        this.closetTitle = "";
//        this.subhead = "";
//        
//        this.saveCloset = function () {
//            
//        };
//    };
    
});