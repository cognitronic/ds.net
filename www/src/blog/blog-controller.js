/**
 * Created by Danny Schreiber on 2/4/2015.
 */
(function(){ 'use strict';
    var BlogController = function(MainService, UtilityService, $state){
		var bc = this;

	    bc.posts = [];

	    bc.viewPost = viewPost;
	    bc.init = init;

	    init();

	    function init(){
		    MainService.getPostsForMainPage().then(function(data){
			    bc.posts = data;
		    });
	    }

	    function viewPost(title){
		    $state.go('blog.detail', {title: UtilityService.formatStringForURL(title)});
	    }
    };
	angular.module('ds').controller('BlogController', ['MainService', 'UtilityService', '$state', BlogController]);
})();