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
    var fbAlbum = $rootScope.fbUser.child('albums/' + album.name);
    var afAlbum = $firebaseArray(fbAlbum);
    return afAlbum.$add(albumCopy);
  };

  Album.addPhoto = function(photoString, albumName){
    var fbPhotos = $rootScope.fbUser.child('albums/' + albumName + '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    return afPhotos.$add(photoString);

  };

  Album.removeAlbum = function(albumName, index){
    console.log(albumName, index);
    $rootScope.afUser.$loaded().then(function(){
      var fbAlbums = $rootScope.fbUser.child('albums');
      var afAlbums = $firebaseArray(fbAlbums);
      var modedNameStr = removeStrAlbum(albumName);
      $rootScope.afUser.names = modedNameStr;
      $rootScope.afUser.$save();
      // console.log(afAlbums[index]);
      afAlbums.$loaded().then(function(){
        afAlbums.$remove(afAlbums[index]);
      });



    });
  }

  function removeStrAlbum(albumName){
    var names = $rootScope.afUser.names ? $rootScope.afUser.names.split(',') : [];
    // console.log('rootscope.afUser.index: ', names.indexOf(albumName));
    if (names.indexOf(albumName) !== -1){
      names.splice(names.indexOf(albumName), 1);
    }
    // console.log('names: ', names);
    return names.join(',');

  }

  return Album;
});
