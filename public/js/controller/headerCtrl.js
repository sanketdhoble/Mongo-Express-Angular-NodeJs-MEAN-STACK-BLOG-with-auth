blogApp.controller('headerCtrl', function($scope,apiFactory,$anchorScroll, $http,$window,$location,$routeParams) {



        $scope.registration=function()
          {
            var data={
              "name":$scope.username,
              "email":$scope.email,
              "password":$scope.password
            }

            apiFactory.registerUser(data)
            .then(function (data,response) {
              $window.alert("Registration successful");
              $scope.postResponse = data.data;
              console.log($scope.postResponse);
              $scope.userName=$scope.postResponse.username;
              $scope.userId=$scope.postResponse.userId;
            })
            .catch(function(response) {
              if(response.status==409)
                  {
                    $window.alert("Username already present, Register with another one :)");

                  }
                   if(response.status==401)
                  {
                    $window.alert("username and password both required");
                  }
                  else if(response.status==500){
                    $window.alert("Something went wrong!!");
                  }

            })

        }

          $scope.login=function(){

            var data={
              "name":$scope.uname,
              "password":$scope.pass
            }

            apiFactory.userLogin(data)
            .then(function (data,response) {
              
              $scope.postResponse = data.data;
              console.log($scope.postResponse);
              localStorage.session=$scope.postResponse.session;
              console.log(localStorage.session);

              $scope.userName=$scope.postResponse.username;
              $scope.userId=$scope.postResponse.userId;
              $http.defaults.headers.common.token = localStorage.session;
              $window.alert("login successful");
              $location.path('/');
            })
            .catch(function(response) {
              if(response.status==410)
                  {
                    $window.alert("User Not found");

                  }
                   if(response.status==411)
                  {
                    $window.alert("wrong password");
                  }
                  else if(response.status==500){
                    $window.alert("Something went wrong!!");
                  }

            })



          }


});