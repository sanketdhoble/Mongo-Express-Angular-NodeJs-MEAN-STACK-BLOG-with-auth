blogApp.controller('article_viewCtrl', function($scope,apiFactory,$timeout,$anchorScroll,$routeParams,$sce, $http, $window) {
  $scope.id = $routeParams.id;
  $anchorScroll();
    apiFactory.getBlogArticle($scope.id)
    	    .then(function (response) {
            $scope.getBlog = response.data;
            console.log($scope.getBlog);
          });

    $scope.toTrustedHTML = function(html){
		    return $sce.trustAsHtml(html);
		}


  });