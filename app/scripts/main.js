/* jshint devel:true */
console.log('\'Allo \'Allo!');

var url = "https://madease.firebaseio.com";
var firebaseRef = new Firebase(url);

$(function() {
    firebaseRef.set({
        type: "fruit",
        name: "apple",
        price: 42.0
    });
});