'use strict';

angular.module('photoAlbums')
.controller('AlbumsListCtrl', function($rootScope, $scope, $state, User){
  $scope.afUser.$loaded(function(){
    $scope.albums = $scope.afUser.names ? $scope.afUser.names.split(',') : [];
    
  });


});
