'use strict';

var app = angular.module('madEase')
  app.controller('PantsCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    });
    
        this.newPants = {
        title: "",
        subhead: "",
        image: ""
    };
      
    document.getElementById("upload_widget_pants").addEventListener("click", function() {

    cloudinary.openUploadWidget({
        cloud_name: 'madease', upload_preset: 'ejxt3qdf'
        }, 
                                
        function(error, result) { 
            console.log(result[0].url) 
            return self.newPants.image = result[0].url
        });
    }, false);
      
    console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/pants');
    this.pants = $firebaseObject(this.ref);  
       
      
    this.pants.$loaded().then(function(data, key){
          console.log(data.pants)
          console.log(self.pants)
      }) 
    
        this.newPants = {
            title: "",
            subhead: "",
            image: ""
        }; 
      
        this.addPants = function(newpants) {
        self.ref.push(newpants);
        return self.newPants = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});