'use strict';

angular.module('photoAlbums')
.controller('AlbumsShowCtrl', function($rootScope, $scope, $state, Album, $window, $firebaseArray){
  $scope.name = $state.params.album;
  $rootScope.afUser.$loaded()
  .then(function(){
    $scope.afPhotos = getPhotos();
    console.info('$scope.afPhotos: ', $scope.afPhotos);
  });


  $scope.saveAlbumInfo = function(album){
    album.name = $state.params.album;

    Album.addInfo(album);
  };

  $scope.convertPhoto = function(photo) {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      Album.addPhoto(reader.result, $scope.name);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  };

  function getPhotos(){
    var fbPhotos = $rootScope.fbUser.child('albums/' + $state.params.album+ '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    return afPhotos;
  }
});
