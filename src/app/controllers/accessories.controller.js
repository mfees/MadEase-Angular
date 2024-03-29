'use strict';

var app = angular.module('madEase')
  app.controller('AccessoriesCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    }); 
      
    this.newAccessories = {
        title: "",
        subhead: "",
        image: ""
    };
      
    document.getElementById("upload_widget_accessories").addEventListener("click", function() {

    cloudinary.openUploadWidget({
        cloud_name: 'madease', upload_preset: 'ejxt3qdf'
        }, 
                                
        function(error, result) { 
            console.log(result[0].url) 
            return self.newAccessories.image = result[0].url
        });
    }, false);
      
    console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/accessories');
    this.accessories = $firebaseObject(this.ref); 
    this.accessoriesImages = $firebaseArray(this.ref);  
       
      
    this.accessories.$loaded().then(function(data, key){
          console.log(data.accessories)
          console.log(self.accessories)
      }) 
      
        this.addAccessories = function(accessories) {
        self.ref.push(accessories);
        return self.newAccessories = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});