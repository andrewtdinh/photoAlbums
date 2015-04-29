'use strict';

angular.module('photoAlbums')
.factory('User', function($rootScope){

  function User(){
  }

  User.oauth = function(provider){
    console.log(provider);
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  }

  User.register = function(user){
    return $rootScope.afAuth.$createUser(user);
  };

  User.login = function(user){
    return $rootScope.afAuth.$authWithPassword(user);
  };

  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };

  return User;
});
