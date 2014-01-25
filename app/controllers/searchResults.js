
app.controller('searchResults', function($http,$location,$scope,ingredientMethods,sharedProperties) {

  // Get the methods from the shared services
  $scope.addToCook = function(ingredient){ ingredientMethods.addToCook($scope,ingredient); };
  $scope.removeFromToCook =function(ingredient){ingredientMethods.removeFromToCook($scope,ingredient);};
  $scope.getSuggestedIngredients = function(){ingredientMethods.getSuggestedIngredients($scope);};


  // Local methods
  $scope.getRecipe = function(id){ $location.path("/recipe/" + id);};
  $scope.getSearchResults = function(){
    var ingredients = [];
    for (var key in $scope.toCook){
      console.log($scope.toCook);
      ingredients.push($scope.toCook[key]['_id'].toString());
    }

    ingredients.sort();

    $http({
      method: 'POST',
      url: '/searchForRecipes/',
      data: ingredients
    })
    .success(function(data, status) {
      $scope.searchResults = data;
    })
    .error(function(data, status){
      console.log(data,status);
    });
  };


  $scope.addAndSearch = function(ingredient){
    ingredientMethods.addToCook($scope,ingredient);
    $scope.getSearchResults();
  };

  $scope.removeAndSearch = function(ingredient){
    ingredientMethods.removeFromToCook($scope, ingredient);
    $scope.getSearchResults();
  };

  // When page is first loaded . . .
  $scope.toCook = sharedProperties.getToCook();
  $scope.getSearchResults();
  $scope.getSuggestedIngredients();

});