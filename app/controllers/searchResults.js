
app.controller('searchResults', function($http,$location,$scope) {
  $scope.searchResults={};
  $scope.getSearchResults = function(){
    $http({
      method: 'GET',
      url: 'searchResults/'+ $location.path().split('/')[2]
    })
    .success(function(data, status) {
      console.log(data);
      $scope.searchResults = data;
    })
      .error(function(data, status){
      console.log(data,status);
   });
  };

  $scope.getSearchResults();

});