
	var blogApp = angular.module('blogApp', ['ngRoute', 'naif.base64','ui.bootstrap']);



  var globalConfig = {headers:  {
      'Content-Type': 'application/json;charset=utf-8;',    
        /*'Authorization': 'Basic aGVhbHRoY29jb2FkbWluQDE2OlhLNjZTVkVNNUVBNVZYWTk=',*/
        'Accept': 'application/json;odata=verbose'
        
                          }
                   };

   blogApp.directive('fileSelect', function() {
  var template = '<input type="file" name="upload"/>';
  return function( scope, elem, attrs ) {
    var selector = $( template );
    elem.append(selector);
    selector.bind('change', function( event ) {
      scope.$apply(function() {
        scope[ attrs.fileSelect ] = event.originalEvent.target.files;
      });
    });
    scope.$watch(attrs.fileSelect, function(file) {
      selector.val(file);
    });
  };
});

   blogApp.directive('fileModel', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
      }]);

	 
	var config = {
		headers:  {
	    'Content-Type': 'application/json;charset=utf-8;',		
        /*'Authorization': 'Basic aGVhbHRoY29jb2FkbWluQDE2OlhLNjZTVkVNNUVBNVZYWTk=',*/
      	'Accept': 'application/json;odata=verbose'
        
                          }
                   };
   



  /*//directive to get file name 
app.directive('fdInput', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                console.log(files[0].name);
                console.log(files[0].size);
            });
        }
    }
}]);*/

blogApp.config(function($routeProvider) {
    		window.routes =
    {
        "/article/:id":{
          templateUrl : 'pages/article_view.html',
            controller  : 'article_viewCtrl',
            requireLogin:true
        },

        "/": {
            templateUrl : 'pages/main_page.html',
            controller  : 'main_pageCtrl',
            requireLogin:true
        },
        
        "/login": {
            templateUrl : 'pages/login.html',
            controller  : 'headerCtrl',
            requireLogin:false
        },
        "/welcome":{
          templateUrl : 'pages/welcome.html',
            controller  : '',
            requireLogin:false
        }
    };
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: '/welcome'});

   //  $routeProvider	
			// .when('/', {
			// 	templateUrl : 'pages/main_page.html',
			// 	controller  : 'main_pageCtrl',
   //      access: {restricted: true}
			
			// })
			// .when('/login', {
			// 	templateUrl : 'pages/login.html',
			// 	controller  : 'loginCtrl',
   //      access: {restricted: false}
			// })
			
			// .when('/article/:id', {
			// 	templateUrl : 'pages/article_view.html',
			// 	controller  : 'article_viewCtrl',
   //      access: {restricted: true}
			// })
	});


// Healthcoco_webApp.run(['$rootScope', function ($rootScope) {
//     $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//         $rootScope.title = current.$$route.title;
//         $rootScope.metatitle = current.$$route.metatitle;
//         $rootScope.metaurl = current.$$route.metaurl;
//         $rootScope.description = current.$$route.description;
//         $rootScope.keywords = current.$$route.keywords;
//         $rootScope.featureimage = current.$$route.featureimage;
//         $rootScope.favicon = current.$$route.favicon;
//     });

//  }]);
  blogApp.run(function ($rootScope, $http,$route, $location) {
        // keep user logged in after page refresh
        if (localStorage.session) {
            $http.defaults.headers.common.token = localStorage.session;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (next.requireLogin && !localStorage.session) 
              {
                  $location.path('/login');
                  
                  $route.reload();
              }
                // for(var i in window.routes) {
                //   if(next.indexOf(i) != -1) {
               
                //    //console.log(window.routes[i].requireLogin);
                //     //console.log(Object.values(window.routes)[2].requireLogin);
                //     if(window.routes[i].requireLogin==true) {
                //         //alert("You need to be authenticated to see this page!");
                //         // event.preventDefault();
                //         $location.path("/login");
                //         console.log("yo");
                //       }
                //       else{
                //         console.log("uo");
                //       }
                //   }
                // }
        });
    });



	// create the controller and inject Angular's $scope

	
