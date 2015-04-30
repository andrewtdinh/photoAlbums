'use strict';

angular.module('photoAlbums')
.controller('AlbumsNewCtrl', function($rootScope, $scope, $state, Album){

  $scope.add = function(album){
    Album.add(album)
    .then(function(){
      $scope.album.name = '';
      $state.go('albums.list');
    });
  };

});
