/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var MainService = function(UtilityService, CacheService, Constants, ProfileService, PostService, PortfolioService, $q){

	    var _getProfile = function(){
		    var deferred = $q.defer();
		    ProfileService.getProfile()
			    .then(function(data){
				    deferred.resolve(data[0]);
			    });
		    return deferred.promise;
		};

	    var _getPostsForMainPage = function(){
		    var deferred = $q.defer();
		    PostService.getPosts()
			    .then(function(data){
				    deferred.resolve(data);
			    });
		    return deferred.promise;
	    };

	    var _getPortfolioForMainPage = function(){
		    var deferred = $q.defer();
		    PortfolioService.getPortfolio()
			    .then(function(data){
				    deferred.resolve(data);
			    });
		    return deferred.promise;
	    };

	    return {
		    getProfile: _getProfile,
		    getPostsForMainPage: _getPostsForMainPage,
		    getPortfolioForMainPage: _getPortfolioForMainPage
	    };
    };

	angular.module('ds').factory('MainService', ['UtilityService', 'CacheService', 'Constants', 'ProfileService', 'PostService', 'PortfolioService', '$q' , MainService]);
})();