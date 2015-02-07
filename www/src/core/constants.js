/**
 * Created by Danny Schreiber on 2/1/2015.
 */

(function(){ 'use strict';
	var BASE_API = 'http://localhost:3000/api/';
	/*jslint smarttabs:true */
	angular.module('ds').constant('Constants', {
		ROUTES: {
			POSTS: BASE_API + 'posts',
			POST: BASE_API + 'post/',
			PROFILE: BASE_API + 'profile',
			PORTFOLIO: BASE_API + 'portfolio',
			RESUME: BASE_API + 'resume',
			SENDMAIL: BASE_API + 'email'
		},
		CACHE: {
			CURRENT_USER: 'currentUser',
			CURRENT_PROFILE: 'currentProfile',
			POSTS_LIST: 'postsList',
			PORTFOLIO_LIST: 'portfolioList'
		}
	});
})();