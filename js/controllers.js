angular.module('precios.controllers', [])

.controller('CategoriesCtrl', function($scope,$ionicViewService,Categories){

  var initPushwoosh = function(){
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
    pushNotification.registerDevice({
      projectid: "205463263722",
      appid : "A5E3F-17A31" },
      function(status) {},
      function(status) {}
    );
  };

  ionic.Platform.ready(function(){
    if(ionic.Platform.isAndroid()){
      document.addEventListener("deviceready", initPushwoosh, true);
    }
  });

  $scope.categories = Categories.all();
})

.controller('ProductsCtrl', function($scope,$stateParams,Categories,Products){
  //var allProducts = JSON.parse(window.localStorage.getItem("products"));
  var categoryId = $stateParams.categoryId;
  $scope.category = Categories.get(categoryId);
  var allProducts = Products.all();
  $scope.products = Products.getObjects(allProducts,"category",categoryId);
})

.controller('ProductCtrl', function($scope,$stateParams,Categories,Products){
  $scope.product = Products.get($stateParams.productId);
  $scope.category = Categories.get($scope.product.category);
})

.controller('ReportCtrl', function($scope,$state,$stateParams,$http,$ionicViewService,$ionicPopup,$ionicLoading,Products){
  var productId = $stateParams.productId;
  $scope.product = Products.get(productId);

  $scope.form = {"supermercado":"","sucursal":"","motivo":""};

  $scope.report = function(){
    var supermercado = $scope.form.supermercado;
    var sucursal = $scope.form.sucursal;
    var motivo = $scope.form.motivo;

    if(supermercado && sucursal && motivo){
      $scope.show();
      var url = "http://www.keepe.rs/projects/precios/api/report.php";
      $http.post(url, {"productId":productId,"supermercado":supermercado,"sucursal":sucursal,"motivo":motivo}).
        success(function(data, status) {
          $scope.hide();
          $scope.showAlert('Exito','Denuncia numero: '+data[1].lastId+'. Gracias!',true);
        })
        .
        error(function(data,status){
          $scope.hide();
      });
    }
    else{
      $scope.showAlert('Oops!','Completa todos los campos',false);
    }
  };

  $scope.showAlert = function(title,body,redirect) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: body
    });
    alertPopup.then(function(res) {
      if(redirect){
        $ionicViewService.nextViewOptions({
          disableBack: true
        });
        $state.go('categories');
      }
    });
  };

  $scope.show = function() {
    $ionicLoading.show({
      template: '<i style="font-size: 35px;" class="icon ion-ios7-reloading"></i>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

});
