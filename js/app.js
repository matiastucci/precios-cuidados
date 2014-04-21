angular.module('precios', ['ionic','precios.controllers','precios.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.filter('capitalize', function() {
  return function(input, scope) {
    if (input!==null)
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('categories', {
    url: "/categories",
    templateUrl: "templates/categories.html",
    controller: 'CategoriesCtrl'
  })

  .state('products', {
    url: "/products/:categoryId",
    templateUrl: "templates/products.html",
    controller: 'ProductsCtrl'
  })

  .state('product', {
    url: "/product/:productId",
    templateUrl: "templates/product.html",
    controller: 'ProductCtrl'
  })

  .state('report', {
    url: "/report/:productId",
    templateUrl: "templates/report.html",
    controller: 'ReportCtrl'
  });

  $urlRouterProvider.otherwise('/categories');
});
