'use strict';

var app = angular.module('madEase')
  app.controller('ShirtCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/shirts');
    this.shirt = $firebaseObject(this.ref);  
       
      
    this.shirt.$loaded().then(function(data, key){
          console.log(data.shirts)
          console.log(self.shirt)
      }) 
    
        this.newShirt = {
            title: "",
            subhead: "",
            image: ""
        }; 
      
        this.addShirt = function(newshirt) {
        self.ref.push(newshirt);
        return self.newShirt = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});


//https://madease.firebaseio.com/closets/10153176300256303/-JkiCn2pNeiPzVu36s7y/content