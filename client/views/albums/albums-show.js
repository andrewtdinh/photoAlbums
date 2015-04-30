'use strict';

angular.module('photoAlbums')
.controller('AlbumsShowCtrl', function($rootScope, $scope, $state, Album, $window, $firebaseArray){
  $scope.name = $state.params.album;

  // $scope.afUSer.$watch(displayInfo);

  $rootScope.afUser.$loaded()
  .then(function(){
    $scope.afPhotos = getPhotos();
    displayInfo();
  });

  $scope.deleteImg = function(photo, index){
    // console.log(photo, index);
    Album.deleteImg(photo, index);
  };

  $scope.saveAlbumInfo = function(album){
    album.name = $state.params.album;

    Album.addInfo(album);
    $scope.album = {};
    $scope.afUser.$loaded().then(function(){
      displayInfo();
    });
  };

  $scope.convertPhoto = function(photo){
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
      preview.src = '';
    }
    $scope.photo = null;
  };
  function displayInfo(){
    var userAlbums = $scope.afUser.albums;
    var key = Object.keys(userAlbums[$state.params.album])[0];
    var printAlbum = userAlbums[$state.params.album][key];

    console.log('printAlbum: ', printAlbum);
    $scope.printAlbum = printAlbum;
    $scope.afUser = $rootScope.afUser;
    $scope.printAlbum.createdAt = new Date(printAlbum.createdAt);
    // displayInfo();
    // $rootScope.afUser.$loaded()
    // .then(function(){
    //
    // });
    // $scope.afUser.albums.hawaii["-Jo7dQz5Qb-l5I59vgCm"].description
  }

  function getPhotos(){
    var fbPhotos = $rootScope.fbUser.child('albums/' + $state.params.album+ '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    return afPhotos;
  }
});
