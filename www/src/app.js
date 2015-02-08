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
	.config(function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
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
				url: '/portfolio',
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
			.state('blog.detail', {
				url: '/:title',
				views: {
					'list': {
						templateUrl: '/src/posts/detail.html',
						controller: 'PostDetailController as postVm'
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