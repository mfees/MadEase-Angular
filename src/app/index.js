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
        templateUrl: '../../states/search.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('add', {
        url: '/add-closet',
        templateUrl: '../../states/add-closet.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('favorites', {
        url: '/favorites',
        templateUrl: '../../states/favorites.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .state('login', {
        url: '/login',
        templateUrl: '../../states/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    })

    $urlRouterProvider.otherwise('/');
  })

.factory('Auth', function($firebaseObject){
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
    console.log("This will break if you login with anything other than FB")
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
    });

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
