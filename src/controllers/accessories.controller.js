'use strict';

var app = angular.module('madEase')
  app.controller('AccessoriesCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/accessories');
    this.accessories = $firebaseObject(this.ref);  
       
      
    this.accessories.$loaded().then(function(data, key){
          console.log(data.accessories)
          console.log(self.accessories)
      }) 
    
        this.newAccessories = {
            title: "",
            subhead: "",
            image: ""
        }; 
      
        this.addAccessories = function(accessories) {
        self.ref.push(accessories);
        return self.newAccessories = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});