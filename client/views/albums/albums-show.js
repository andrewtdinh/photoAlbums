'use strict';

angular.module('photoAlbums')
.controller('AlbumsShowCtrl', function($rootScope, $scope, $state, Album){
  $scope.name = $state.params.album;

  $scope.saveAlbumInfo = function(album){
    album.name = $state.params.album;
    
    Album.addInfo(album);
  };
});
