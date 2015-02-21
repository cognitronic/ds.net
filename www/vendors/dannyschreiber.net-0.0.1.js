/**
 * Created by Danny Schreiber on 2/4/2015.
 */

angular.module('ds.components', [
	'ds.components.tpls',
	'ds.components.angular-tweet',
	'ds.components.angular-word-rotator'
]);

angular.module('ds.components.tpls', [
	'template/components/angular-tweet.html'
]);
/**
 * Created by Danny Schreiber on 1/31/2015.
 */

angular.module('ds', ['ui.router',
	'ui.bootstrap',
	'ngSanitize',
	'ngAnimate',
	'toaster',
	'ds.components',
	'ram-utilities.ui',
	'danny.ui.services',
	'cloudinary'])
	.config(function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);
		$httpProvider.defaults.transformRequest = function (data) {
			if (data === undefined) {
				return data;
			}
			return $.param(data);
		};

		//sets the content type header globally for $http calls
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json; charset=UTF-8'};
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('about', {
				url: '/',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/about/about.html',
						controller: 'AboutController as ac'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('blog', {
				url: '/blog',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/blog/blog.html',
						controller: 'BlogController as bc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('blog.detail', {
				url: '/:title',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/blog/detail.html',
						controller: 'BlogDetailController as bdc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('blog-list', {
				url: '/blog-list',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/blog/list.html',
						controller: 'BlogListController as bc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('portfolio', {
				url: '/work',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/portfolio/portfolio.html',
						controller: 'PortfolioController as pc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('portfolio.detail', {
				url:'/:title',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/portfolio/detail.html',
						controller: 'ProjectController as projVm'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('contact', {
				url: '/contact',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/contact/contact.html',
						controller: 'ContactController as cc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('resume', {
				url: '/resume',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/resume/resume.html',
						controller: 'ResumeController as rc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('posts', {
				url: '/posts',
				views: {
					'list': {
						templateUrl: '/src/posts/list.html',
						controller: 'PostController as posts'
					}
				}
			})
			.state('project', {
				url:'/Work',
				abstract: true
			})
			.state('project.detail', {
				url: '/:title',
				views: {
					'': {
						templateUrl: '/src/portfolio/detail.html',
						controller: 'ProjectController as projVm'
					}
				}
			});
	});
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var AboutController = function(MainService){
		var ac = this;
		ac.profile = {};
	    ac.init = init;

	    init();

	    function init(){
			MainService.getProfile().then(function(data){
				ac.profile = data;
			});

		    ac.words = ['software engineering', 'artistic exploration', 'playing music', 'Brazilian Jiu Jitsu', 'learning new things'];
	    }
    };
	angular.module('ds').controller('AboutController', ['MainService', AboutController]);
})();
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
/**
 * Created by Danny Schreiber on 1/31/2015.
 */

(function(){ 'use strict';
    var PostController = function(){

    };
	angular.module('ds').controller('PostController', [PostController]);
})();
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
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';

    function ramAngularWordRotator($compile, $interval){
	    function link(scope, el, attrs){
		    var rotate_words = el;
		    var next_word_index = '';

		    var i = 0;
		    var words = scope.$eval(scope.wordList); //scope.$eval necessary to convert into array, otherwise value shows as a string.
		    var len = words.length;
		    for(i; i < len; i++){
			    rotate_words.append('<span>' + words[i] + '.&nbsp;</span>');
		    }



		    if(words.length && Modernizr.csstransforms) {
			    rotate_words.find('span').eq(0).addClass('active');
			    $interval(function(){
				    next_word_index = rotate_words.find('.active').next().length ? rotate_words.find('.active').next().index() : 0;
				    rotate_words.find('.active').addClass('rotate-out').removeClass('rotate-in active');
				    rotate_words.find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
			    },3000);
		    }

		    //Compiles the newly added elements and appends them to the directive's parent element.
		    $compile(rotate_words)(scope);
		    el.append(rotate_words);
	    }
	    return {
		    restrict: 'EA',
		    replace: true,
		    template: '<div></div>',
		    scope: {
			    wordList: '@'
		    },
		    link: link
	    };
    }


	angular.module('ds.components.angular-word-rotator', []).directive('ramAngularWordRotator', ['$compile', '$interval', ramAngularWordRotator]);
})();
/**
 * Created by Danny Schreiber on 2/3/2015.
 */
$.cloudinary.config().cloud_name = 'raven-art-media';
$.cloudinary.config().api_key = '194632662182779';
$.cloudinary.config().upload_preset = 'ormwe5hh';

/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var ContactController = function(MainService, EmailService, toaster){
		var cc = this;
		cc.email = {};

	    cc.init = init;
		cc.sendEmail = sendEmail;

	    init();

	    function init(){

	    }

	    function sendEmail(email){
		    var msg = {
			    fromEmail: email.fromEmail,
			    toEmail: 'danny@ravenartmedia.com',
			    subject: email.subject || 'RavenArtMedia.com Contact Form',
			    textMessage: email.htmlMessage,
			    htmlMessage: 'Name: ' + email.name + ' <br/><br />'
		    };
		    msg.htmlMessage += '<br /><br />' + email.htmlMessage;
			EmailService.sendMail(msg)
				.then(function(data){
					if(data.rejected.length < 1){
						cc.email = {};
						toaster.pop('success', 'Message Sent', "Thanks for reaching out, I'll get back to you as soon as I can!");
					}
				});
	    }
    };
	angular.module('ds').controller('ContactController', ['MainService', 'EmailService', 'toaster', ContactController]);
})();
/**
 * Created by Danny Schreiber on 2/1/2015.
 */

(function(){ 'use strict';
	var BASE_API = 'https://admin-ds-net.herokuapp.com/api/';
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
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var HeaderController = function(MainService){
		var hc = this;

	    hc.profile = {};
	    hc.init = init;

	    init();

	    function init(){
		    hc.profile = MainService.getProfile();
	    }
    };
	angular.module('ds').controller('HeaderController', ['MainService', HeaderController]);
})();
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
		    MainService.getProfile().then(function(data){
			    spa.profile = data;
			    setTagLine();
			    setBannerImage();
		    });
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
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var PortfolioController = function(MainService, UtilityService, $state){
		var pc = this;

	    pc.portfolio = [];
	    pc.init = init;
	    pc.openProject = openProject;
	    pc.viewProjectList = viewProjectList;

	    init();

	    function init(){

		    MainService.getPortfolioForMainPage().then(function(data){
			    pc.portfolio = data;
		    });
		    pc.viewProjectList = viewProjectList;
	    }

	    function openProject(title){
		    $state.go('portfolio.detail', {title: UtilityService.formatStringForURL(title)});
	    }

	    function viewProjectList(){
		    $state.go('projects');
	    }
    };
	angular.module('ds').controller('PortfolioController', ['MainService', 'UtilityService', '$state', PortfolioController]);
})();
/**
 * Created by Danny Schreiber on 2/3/2015.
 */

(function(){ 'use strict';
    var ProjectController = function(MainService, $state, PortfolioService){

	    var projVm = this;
	    projVm.project = {};

	    projVm.loadProject = loadProject;
	    projVm.init = init;

	    init();

	    function init(){
		    projVm.loadProject();
	    }

	    function loadProject(){
		    PortfolioService.getPortfolioByTitle($state.params.title)
			    .then(function(data){
				   projVm.project = data[0];
			    });
	    }
    };
	angular.module('ds').controller('ProjectController', ['MainService', '$state', 'PortfolioService', ProjectController]);
})();
/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var ResumeController = function(ResumeService){
		var rc = this;

	    rc.resume = {};

	    rc.init = init;

	    init();

	    function init(){
			ResumeService.getResume()
				.then(function(data){
					rc.resume = data[0];
				});
	    }
    };
	angular.module('ds').controller('ResumeController', ['ResumeService', ResumeController]);
})();