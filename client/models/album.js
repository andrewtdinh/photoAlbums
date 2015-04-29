'use strict';

angular.module('photoAlbums')
.factory('Album', function($rootScope){

  function Album(){
  }

  Album.add = function(album){
    console.log($rootScope.afUser);
    var names = $rootScope.afUser.names ? $rootScope.afUser.names.split(',') : [];
    names.push(album.name);
    $rootScope.afUser.names = names.join(',');
    return $rootScope.afUser.$save();
  };
  return Album;
});
