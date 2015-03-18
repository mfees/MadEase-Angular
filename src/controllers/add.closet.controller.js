'use strict';

var app = angular.module('madEase')
  app.controller('addCtrl', function ($firebaseArray, $firebaseObject, Auth, $state) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    var closet = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id);
    this.myCloset = $firebaseArray(closet);    
      
    this.newCloset = {
        closetTitle: "",
        subhead: "",
        content: {
            pants: [{
                title: "",
                subhead: "",
                image: ""
            }],
            shirts: [{
                title: "",
                subhead: "",
                image: ""
            }],
            shoes: [{
                title: "",
                subhead: "",
                image: ""
            }],
            accessories: [{
                title: "",
                subhead: "",
                image: ""
            }]
        }
    };

      
//    this.pants = this.newCloset.content.pants;
//    console.log(this.pants);  
//      
//    this.addCloset = function(closetName) {
//        this.myCloset.child(closetName).$add({test: hello});
//    };  
      
    this.addCloset = function(c) {
        this.myCloset.$add(c);
        $state.go("search");
        return this.newCloset = {
            closetTitle: "",
            subhead: "",
            content: {
                pants: [{
                    title: "",
                    image: ""
                }],
                shirts: [{
                    title: "",
                    image: ""
                }],
                shoes: [{
                    title: "",
                    image: ""
                }],
                accessories: [{
                    title: "",
                    image: ""
                }]
            }
        };
    };
    
});