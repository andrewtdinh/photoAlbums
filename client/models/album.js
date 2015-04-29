'use strict';

angular.module('photoAlbums')
.factory('Album', function($rootScope, $window, $firebaseArray){

  function Album(){
  }

  Album.add = function(album){
    console.log($rootScope.afUser);
    var names = $rootScope.afUser.names ? $rootScope.afUser.names.split(',') : [];
    names.push(album.name);
    $rootScope.afUser.names = names.join(',');
    return $rootScope.afUser.$save();
  };

  Album.addInfo = function(album){
    var albumCopy = angular.copy(album);
    albumCopy.date = album.date.getTime();
    albumCopy.createdAt = $window.Firebase.ServerValue.TIMESTAMP;

    console.log(albumCopy);

    var fbAlbum = $rootScope.fbUser.child('albums/' + album.name);
    var afAlbum = $firebaseArray(fbAlbum);
    return afAlbum.$add(albumCopy);

  };

  Album.addPhoto = function(photoString, albumName){
    var fbPhotos = $rootScope.fbUser.child('albums/' + albumName + '/photos');
    // console.log('albumName: ', albumName);
    var afPhotos = $firebaseArray(fbPhotos);

    console.log('fbPhotos: ', fbPhotos);
    return afPhotos.$add(photoString);

  };
  return Album;
});
