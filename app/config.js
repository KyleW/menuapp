
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
    redirectTo: '/login'
  })
  .when('/recipe/:recipeId', {
    controller: 'recipe',
    templateUrl: 'views/recipe.html'
  })
  .when('/login', {
    controller: 'login',
    templateUrl: 'views/login.html'
  })
  .when('/searchResults/:searchId', {
    controller: 'searchResults',
    templateUrl: 'views/searchResults.html'
  })
  .when('/ingredients/:userId',{
    controller: 'ingredients',
    templateUrl: 'views/ingredients.html'
  })
  .when('/404', {
    templateUrl: 'views/404.html'
  })
  .otherwise({redirectTo: '/404'});
}]);