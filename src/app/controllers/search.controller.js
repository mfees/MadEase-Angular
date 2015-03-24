'use strict';

var app = angular.module('madEase')
  app.controller('SearchCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
    });  
      console.log(self.user);
    var ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id);
    this.search = $firebaseArray(ref); 
      
      this.search.$loaded().then(function(data, key){
          console.log(data)
      })
    
      console.log(this.search); 
      
});

    app.filter('reverse', function() {
        return function(items) {
        return items.slice().reverse();
      };
    }); 