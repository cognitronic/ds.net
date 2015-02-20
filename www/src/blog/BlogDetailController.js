/**
 * Created by Danny Schreiber on 2/20/2015.
 */
(function(){ 'use strict';
	var BlogDetailController = function(MainService, PostService, UtilityService, $state){
		var bdc = this;

		bdc.post = {};

		bdc.init = init;
		bdc.backToList = backToList;

		init();

		function init(){
			PostService.getPost($state.params.title).then(function(data){
				bdc.post = data[0];
			});
		}

		function backToList(){
			$state.go('blog');
		}
	};
	angular.module('ds').controller('BlogDetailController', ['MainService', 'PostService', 'UtilityService', '$state', BlogDetailController]);
})();