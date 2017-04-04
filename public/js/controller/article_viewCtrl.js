blogApp.controller('article_viewCtrl', function($scope,apiFactory,$timeout,$location,$anchorScroll,$routeParams,$sce, $http, $window) {
  $scope.id = $routeParams.id;
  $anchorScroll();
    apiFactory.getBlogArticle($scope.id)
    	    .then(function (response) {
            $scope.getBlog = response.data;
            console.log($scope.getBlog);
          })
           .catch(function(response) {
                  if(response.status==403)
                  {
                    console.log("session Expired, Login again");
                    $location.search({});
                    $location.path('/login');
                    delete localStorage.session;
                  }
                   if(response.status==404)
                  {
                    $window.alert("Check your Internet Connection/page not found");
                  }
                  else if(response.status==500){
                    $window.alert("Something went wrong!!");
                  }
                })

    $scope.toTrustedHTML = function(html){
		    return $sce.trustAsHtml(html);
		}

    $scope.featuredBlogs=function()
         {
          apiFactory.featuredBlogs()
    	    .then(function (response) {
            $scope.getFeaturedBlogs = response.data;
            console.log($scope.getFeaturedBlogs);
            if ($scope.getFeaturedBlogs.length==0) {
              $scope.no_data_div=true;
              $scope.hidePagination=true;
            }

          })
          .catch(function(response) {
                  if(response.status==403)
                  {
                    console.log("session Expired, Login again");
                    $location.search({});
                    $location.path('/login');
                    delete localStorage.session;
                  }
                   if(response.status==404)
                  {
                    $window.alert("Check your Internet Connection/page not found");
                  }
                  else if(response.status==500){
                    $window.alert("Something went wrong!!");
                  }
                })
        
         }
         $scope.featuredBlogs();




  });