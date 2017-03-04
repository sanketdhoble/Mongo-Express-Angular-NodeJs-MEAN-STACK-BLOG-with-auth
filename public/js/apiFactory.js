angular.module('blogApp')
    .factory('apiFactory', ['$http', function($http) {

    var urlBase = '/getBlogs';
    var apiFactory = {};

    apiFactory.getBlogs = function (config) {
        return $http.get('/blog/get',config);
    };

    apiFactory.getBlogArticle = function(id){
        return $http.get('/blog/get/'+id);
    };
    apiFactory.registerUser=function(data)
    {
        return $http.post('/register',data);
    }
   
    apiFactory.userLogin = function (data) {
        return $http.post('/authenticate',data);
    };
    apiFactory.logout=function()
    {
        return $http.get('/logout');
    }

    // dataFactory.updateCustomer = function (cust) {
    //     return $http.put(urlBase + '/' + cust.ID, cust)
    // };

    // dataFactory.deleteCustomer = function (id) {
    //     return $http.delete(urlBase + '/' + id);
    // };

    // dataFactory.getOrders = function (id) {
    //     return $http.get(urlBase + '/' + id + '/orders');
    // };

    return apiFactory;
}]);
