'use strict';

angular.module('madEase', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('search', {
        url: '/find-closet',
        templateUrl: 'app/states/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
    })
        .state('add', {
        url: '/add-closet',
        templateUrl: 'app/states/add-closet.html',
        controller: 'addCtrl',
        controllerAs: 'add'
    })
        .state('closets', {
        url: '/closets/:userId/:closetId',
        templateUrl: 'app/states/closets.html',
        controller: 'ClosetCtrl',
        controllerAs: 'closet'
    })
            .state('closets.shirts', {
            url: '/:id/:closetId/shirt-form',
            templateUrl: 'app/states/shirt-form.html',
            controller: 'ShirtCtrl',
            controllerAs: 'shirt'
        })
            .state('closets.pants', {
            url: '/:id/:closetId/pant-form',
            templateUrl: 'app/states/pant-form.html',
            controller: 'PantsCtrl',
            controllerAs: 'pants'
        })
            .state('closets.shoes', {
            url: '/:id/:closetId/shoe-form',
            templateUrl: 'app/states/shoe-form.html',
            controller: 'ShoesCtrl',
            controllerAs: 'shoes'
        })
            .state('closets.access', {
            url: '/:id/:closetId/access-form',
            templateUrl: 'app/states/access-form.html',
            controller: 'AccessoriesCtrl',
            controllerAs: 'accessories'
        })
        
        .state('favorites', {
        url: '/favorites',
        templateUrl: 'app/states/favorites.html'
    })
        .state('login', {
        url: '/login',
        templateUrl: 'app/states/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    })

    $urlRouterProvider.otherwise('/login');
  })

.filter('reverse', function() {
    return function(items) {
    return items.slice().reverse();
  };
})
    
.factory('Auth', function($firebaseObject, $state){
    var auth = new Firebase('https://madease.firebaseio.com');
    var currentUser = {};
 
  return {
    /**
    * Wrapper for `onAuth` that filters the `auth` object
    * through the `updateUser()` function
    */
    onAuth: function(creds){
      auth.onAuth(function(data){
        creds(updateUser(data));
      });
    },
    /**
    * Wrapper for `authWithOAuthPopup()` for each login option.
    */
        
    fbLogin: function(){
 
        return auth.authWithOAuthPopup("facebook", function(error, authData) {
            console.log(authData)
        if (error) {
            console.log("Login Failed!", error);
        } else {
            $state.go("home");
            console.log("Authenticated successfully with payload:", authData);
        }
      }, {remember: "sessionOnly"})
    },
        
    /** Wrapper for the unauth() functionality to logout
    */
    logout: function(){
    auth.unauth();
    $state.go("login");    
    console.log("goodbye")
    },
    /** Wrapper to allow the main controller to check if a user is currently 
    * Logged in currently
    */
    loggedIn: function(){
      if(auth.getAuth()){
        return true;
      }
    },
    /**
    *Get the current user.
    */
    getUser: function(){
      return currentUser;
    }
  };
 
  /**
  * Tranform the `authdUser` object from `$firebaseAuth` into a full User
  * record in the `/users` collection.
  *
  * @param {Object} authdUser from $firebaseAuth.getAuth()
  * @return {Object} from $firebase.$asObject()
  */
  function updateUser(authdUser){
      console.log(authdUser)
    if ( authdUser === null ){
      return null;
    }
    /**
    * Create a reference to the users collection within Firebase
    * Then create a child of the users collection named after the
    * authdUser's Facebook ID
    */
    var fbUser = auth.child('users').child(authdUser.facebook.id);           
    
    // Update the authdUser's information in Firebase
    fbUser.update({
            uid: authdUser.facebook.id,
            facebook: authdUser.facebook,
            fullName: authdUser.facebook.displayName,
            firstName: authdUser.facebook.cachedUserProfile.first_name,
            lastName: authdUser.facebook.cachedUserProfile.last_name,
            avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
    })

    // Set user to the object reference of authdUser
    fbUser = $firebaseObject(auth
      .child('users')
      .child(authdUser.facebook.id)
    )

    //stores the user information for use elsewhere
    currentUser = fbUser;

    return fbUser;
   }
  })
;