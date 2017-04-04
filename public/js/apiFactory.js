angular.module('blogApp')
    .factory('apiFactory', function($http) {

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
    apiFactory.featuredBlogs=function(){
        return $http.get('/blog/featured');
    }
    apiFactory.postBlog=function(data){
        return $http.post('/blog/add',data);
    }
    apiFactory.updateBlog=function(data,id){
        return $http.put('/blog/update/'+id,data)
    }
    apiFactory.deleteBlog=function(id){
        return $http.delete('/blog/delete/'+id);
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
});
