/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var MainService = function(UtilityService, CacheService, Constants){

	    var _getProfile = function(){
			return CacheService.getItem(Constants.CACHE.CURRENT_PROFILE);
		};

	    var _getPostsForMainPage = function(){
		    return CacheService.getItem(Constants.CACHE.POSTS_LIST);
	    };

	    var _getPortfolioForMainPage = function(){
		    return CacheService.getItem(Constants.CACHE.PORTFOLIO_LIST);
	    };

	    return {
		    getProfile: _getProfile,
		    getPostsForMainPage: _getPostsForMainPage,
		    getPortfolioForMainPage: _getPortfolioForMainPage
	    };
    };

	angular.module('ds').factory('MainService', ['UtilityService', 'CacheService', 'Constants', MainService]);
})();