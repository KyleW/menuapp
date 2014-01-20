
app.controller('ingredients', function($http,$location,$scope) {
  $http({
    method: 'GET',
    url: 'ingredientInventory/'+ $location.path().split('/')[2]
  })
  .success(function(data, status) {
    // console.log(data);
    // $scope.possibleIngredients = data;
    $scope.ingredients = [
    {name:'carrots' , liked:true},
    {name:'bacon' , liked:true},
    {name:'beets' , liked:false},
    {name:'onions' , liked:false}
    ];
  })
  .error(function(data, status){
    console.log(data,status);
  });

  $scope.saveIngredients=function(){
    console.log("called saveIngredients");
    $http({
    method: 'POST',
    url: 'ingredientInventory/'+ $location.path().split('/')[2],
    data:$scope.ingredients
  })
  .success(function(data, status) {
    console.log("ingredients sent");
    console.log(data);
  })
  .error(function(data, status){
    console.log(data,status);
  });
  };
  
  $scope.removeFromLike = function(ingredient){
    console.log("called removeFromLike on ", ingredient);
    for (var i = 0; i < $scope.ingredients.length ;i++){
      if( $scope.ingredients[i].name === ingredient){
        $scope.ingredients[i].liked = false;
      }
    }
  };

  $scope.addToLike = function(ingredient){
    for (var i = 0; i < $scope.ingredients.length ;i++){
      if( $scope.ingredients[i].name === ingredient){
        $scope.ingredients[i].liked=true;
      }
    }
  };

});