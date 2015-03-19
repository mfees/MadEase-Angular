'use strict';

var app = angular.module('madEase')
  app.controller('addCtrl', function ($firebaseArray, $firebaseObject, Auth, $state) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    this.closet = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id);
    this.myCloset = $firebaseObject(this.closet);    
      
    this.newCloset = {
        closetTitle: "",
        subhead: "",
        content: {
            pants: {},
            shirts: {},
            shoes: {},
            accessories: {}
        }
    }; 
      
    this.addCloset = function(c) {
        self.closet.push(c);
        $state.go("search");
        return this.newCloset = {
            closetTitle: "",
            subhead: "",
            content: {
                pants: {},
                shirts: {},
                shoes: {},
                accessories: {}
            }
        };
    };
    
});