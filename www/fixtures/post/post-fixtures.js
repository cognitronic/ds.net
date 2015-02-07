/**
 * Created by Danny Schreiber on 1/31/2015.
 */
(function(){ 'use strict';
	angular.module('ds.mocks')
		.factory('PostFixtures', PostFixtures);

	var _blogList = getJSONFixture('post/post-list.json');
	var _post = getJSONFixture('post/post.json');

	function PostFixtures(){
		return {
			blogList: _blogList.posts,
			post: _post
		};
	}
})();