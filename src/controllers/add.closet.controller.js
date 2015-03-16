'use strict';

var app = angular.module('madEase', [])
  app.controller('AddCtrl', function ($firebaseArray, $firebaseObject) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
    var closet = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id);
    this.myCloset = $firebaseArray(closet);  
    
//    function clothingCtrl () {
//        this.closetTitle = "";
//        this.subhead = "";
//        
//        this.saveCloset = function () {
//            
//        };
//    };
    
});