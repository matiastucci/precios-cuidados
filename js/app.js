angular.module('precios', ['ionic','precios.controllers','precios.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
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
