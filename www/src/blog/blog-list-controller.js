/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var BlogListController = function(MainService, PostService, $state){
		var bc = this;

	    bc.posts = [];

	    bc.init = init;

	    init();

	    function init(){
		    bc.posts = MainService.getPostsForMainPage();
	    }
    };
	angular.module('ds').controller('BlogListController', ['MainService', 'PostService', '$state', BlogListController]);
})();