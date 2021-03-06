
app.controller('searchResults', function($http,$location,$scope,ingredientMethods,sharedProperties) {

  //Methods from shared services
  $scope.addToCook = function(ingredient){
    ingredientMethods.addToCook($scope,ingredient);
  };

  $scope.removeFromToCook =function(ingredient){
    ingredientMethods.removeFromToCook($scope,ingredient);
  };

  $scope.getSuggestedIngredients = function(){
    ingredientMethods.getSuggestedIngredients($scope);
  };

  $scope.addAndSearch = function(ingredient){
    ingredientMethods.addToCook($scope,ingredient);
  };

  $scope.removeAndSearch = function(ingredient){
    ingredientMethods.removeFromToCook($scope, ingredient);
  };

  // Local methods
  $scope.getRecipe = function(id){
    // window.location="http://www.yummly.com/recipe/" + id;
    // $location.path("http://www.yummly.com/recipe/" + id);
    url = "http://www.yummly.com/recipe/" + id;
    window.open(url, '_blank');
  };

  var ingredientsToList = function(){
    var ingredients = [];
    for (var key in $scope.toCook){
      // ingredients.push($scope.toCook[key]['_id'].toString());
      ingredients.push($scope.toCook[key]['_id']);
    }
    return ingredients.sort();
  };

  $scope.getSearchResults = function(){
    ingredients = ingredientsToList();

    $http({
      method: 'POST',
      url: '/searchForRecipes/',
      data: ingredients
    })
    .success(function(data, status) {
      // console.log("recipe success");
      // console.log(data,status);
      $scope.searchResults = data;
      if ($scope.searchResults.matches.length > 0){
        $scope.suggestedRecipeError = false;
      } else {
        $scope.suggestedRecipeError = true;
      }

      //Add placeholder image where needed
      for(var i = 0 ; i < 20 && i < $scope.searchResults.matches.length ; i++){
        if($scope.searchResults.matches[i].smallImageUrls.length === 0){
          console.log("added a placeholder for ");
          console.log($scope.searchResults.matches[i]);
          $scope.searchResults.matches[i].smallImageUrls[0] = 'assets/images/icon_17562-2.png';
        }
      }
    })
    .error(function(data, status){
      console.log(data,status);
      console.log("recipe fail");
      $scope.suggestedRecipeError = true;
    });

    $http({
      method: 'POST',
      url: '/searchForRecipesNumber/',
      data: ingredients
    })
    .success(function(data, status) {
      $scope.recByIng = data;
    })
    .error(function(data, status){
      console.log(data,status);
    });

  };

  // When page is first loaded . . .
  $scope.toCook = sharedProperties.getToCook();
  $scope.getSearchResults();
  $scope.getSuggestedIngredients();

});