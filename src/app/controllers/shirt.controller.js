'use strict';

var app = angular.module('madEase')
  app.controller('ShirtCtrl', function ($firebaseArray, $firebaseObject, Auth, $stateParams) {
    var self = this;
    Auth.onAuth(function(user, authdUser){
        self.user = user;
        
    }); 
      
    this.newShirt = {
        title: "",
        subhead: "",
        image: ""
    };
      
    document.getElementById("upload_widget_opener").addEventListener("click", function() {

    cloudinary.openUploadWidget({
        cloud_name: 'madease', upload_preset: 'ejxt3qdf'
        }, 
                                
        function(error, result) { 
            console.log(result[0].url) 
            return self.newShirt.image = result[0].url
        });
    }, false);
      
    console.log(self.user);
    this.ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/shirts');
    this.shirt = $firebaseObject(this.ref); 
    
//    var ref = new Firebase('https://madease.firebaseio.com/closets/' + self.user.$id + '/' + $stateParams.closetId + '/content/shirts');  
//    ref.orderByValue().limitToLast(4).on("value", function(snapshot) {
//        snapshot.forEach(function(data) {
//        console.log("The " + data.key() + " dinosaur's score is " + data.val());
//      });
//    });  
       
      
    this.shirt.$loaded().then(function(data, key){
          console.log(data.shirts)
          console.log(self.shirt)
      }) 
    
        this.addShirt = function(newshirt) {
        self.ref.push(newshirt);
        return self.newShirt = {
            title: "",
            subhead: "",
            image: ""
        };;
    };
});