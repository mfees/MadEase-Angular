'use strict';

var app = angular.module('madEase')
  app.controller('ShoesCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/shoes');
    this.shoes = $firebaseObject(this.ref);  
       
      
    this.shoes.$loaded().then(function(data, key){
          console.log(data.shoes)
          console.log(self.shoes)
      }) 
    
        this.newShoes = {
            title: "",
            subhead: "",
            image: ""
        }; 
      
        this.addShoes = function(newshoes) {
        self.ref.push(newshoes);
        return self.newShoes = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});