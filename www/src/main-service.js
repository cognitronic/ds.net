/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var MainService = function(UtilityService, CacheService, Constants, ProfileService, PostService, PortfolioService, $q){

	    var _getProfile = function(){
		    var deferred = $q.defer();
		    if(!CacheService.getItem(Constants.CACHE.CURRENT_PROFILE)){
			    ProfileService.getProfile()
				    .then(function(data){
					    CacheService.setItem(Constants.CACHE.CURRENT_PROFILE, data[0]);
					    deferred.resolve(data[0]);
				    });
		    } else{
			    deferred.resolve(CacheService.getItem(Constants.CACHE.CURRENT_PROFILE));
		    }
		    return deferred.promise;
		};

	    var _getPostsForMainPage = function(){
		    var deferred = $q.defer();
		    if(!CacheService.getItem(Constants.CACHE.POSTS_LIST)){
			    PostService.getPosts()
				    .then(function(data){
					    CacheService.setItem(Constants.CACHE.POSTS_LIST, data);
					    deferred.resolve(data);
				    });
		    } else{
			    deferred.resolve(CacheService.getItem(Constants.CACHE.POSTS_LIST));
		    }
		    return deferred.promise;
	    };

	    var _getPortfolioForMainPage = function(){
		    var deferred = $q.defer();
		    if(!CacheService.getItem(Constants.CACHE.PORTFOLIO_LIST)){
			    PortfolioService.getPortfolio()
				    .then(function(data){
					    CacheService.setItem(Constants.CACHE.PORTFOLIO_LIST, data);
					    deferred.resolve(data);
				    });
		    } else{
			    deferred.resolve(CacheService.getItem(Constants.CACHE.PORTFOLIO_LIST));
		    }
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