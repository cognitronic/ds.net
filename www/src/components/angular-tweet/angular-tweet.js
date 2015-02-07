/**
 * Created by Danny Schreiber on 2/4/2015.
 */
(function(){ 'use strict';

	function link(scope, el, attr){
		var latest_tweets = el.find('#latest-tweets');
		if(latest_tweets.length) {
			twitterFetcher.fetch(scope.twitterId, '', scope.tweetCount, true, false, true, '', false, handleTweets);
		}

		function handleTweets(tweets){
			var x = tweets.length;
			var n = 0;
			var html = '<ul>';
			while(n < x) {
				html += '<li>' + tweets[n] + '</li>';
				n++;
			}
			html += '</ul>';
			latest_tweets.html(html);
		}
    }

	var ramAngularTweet = function(){
		return {
			restrict: 'EA',
			transclude: true,
			templateUrl: 'template/components/angular-tweet.html',
			link: link,
			scope: {
				twitterId: '@',
				tweetCount: '@',
				cssClass: '@'
			}
		};
    };

	angular.module('ds.components.angular-tweet', []).directive('ramAngularTweet', [ramAngularTweet]);

	angular.module('template/components/angular-tweet.html', []).run(['$templateCache', function($templateCache){
		$templateCache.put('template/components/angular-tweet.html',
			'<div id="latest-tweets"></div>'
		);
	}]);
})();

//561892883058290688