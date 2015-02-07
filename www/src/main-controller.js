/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var MainController = function(MainService, $state, UtilityService, $location){
		var spa = this;
	    spa.profile = {};
	    spa.tagLine = '';
	    spa.bannerImagePath ='';
	    spa.posts = [];
	    spa.portfolio = [];

	    spa.setBannerImage = setBannerImage;

	    init();

	    function init(){
		    spa.profile = MainService.getProfile();
		    setTagLine();
		    setBannerImage();
		    spa.posts = MainService.getPostsForMainPage();
		    spa.portfolio = MainService.getPortfolioForMainPage();

		    spa.openProject = openProject;
		    spa.viewPost = viewPost;
		    spa.viewProjectList = viewProjectList;
		    spa.viewBlogList = viewBlogList;
	    }

	    function openProject(title){
		    $state.go('work.detail', {title: UtilityService.formatStringForURL(title)});
	    }

	    function viewPost(title){
		    $state.go('blog.detail', {title: UtilityService.formatStringForURL(title)});
	    }

	    function viewProjectList(){
		    $state.go('projects');
	    }

	    function viewBlogList(){
		    $state.go('blog');
	    }

	    function setTagLine(){
		    if(spa.profile.tagLines.length > 1){
			    spa.tagLine = spa.profile.tagLines[Math.floor(Math.random() * spa.profile.tagLines.length)];
		    } else {
			    spa.tagLine = spa.profile.tagLines[0];
		    }
	    }

	    function setBannerImage(){
		    if(spa.profile.bannerImages.length > 1){
			    spa.bannerImagePath = spa.profile.bannerImages[Math.floor(Math.random() * spa.profile.bannerImages.length)];
		    } else {
			    spa.bannerImagePath = spa.profile.bannerImages[0];
		    }
	    }
    };

	angular.module('ds').controller('MainController', ['MainService', '$state', 'UtilityService', '$location', MainController]);
})();