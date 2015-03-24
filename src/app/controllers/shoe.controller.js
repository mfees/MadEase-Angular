'use strict';

var app = angular.module('madEase')
  app.controller('ShoesCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });  
      
    this.newShoes = {
        title: "",
        subhead: "",
        image: ""
    };
      
    document.getElementById("upload_widget_shoes").addEventListener("click", function() {

    cloudinary.openUploadWidget({
        cloud_name: 'madease', upload_preset: 'ejxt3qdf'
        }, 
                                
        function(error, result) { 
            console.log(result[0].url) 
            return self.newShoes.image = result[0].url
        });
    }, false);
      
    console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/shoes');
    this.shoes = $firebaseObject(this.ref);  
       
      
    this.shoes.$loaded().then(function(data, key){
          console.log(data.shoes)
          console.log(self.shoes)
      }) 
      
        this.addShoes = function(newshoes) {
        self.ref.push(newshoes);
        return self.newShoes = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});