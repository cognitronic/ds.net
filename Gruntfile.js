/**
 * Created by Danny Schreiber on 12/30/2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            jsFilesForTesting: [
                'www/vendors/jquery/jquery.js',
                'www/vendors/jasmine-jquery/lib/jasmine-jquery.js',
                'www/vendors/angular/angular.js',
                'www/vendors/angular-bootstrap/ui-bootstrap-tpls.js',
                'www/vendors/angular-ui-router/release/angular-ui-router.js',
                'www/vendors/angular-mocks/angular-mocks.js',
                'www/vendors/lodash/dist/lodash.js',
                'www/vendors/ram-utilities/dist/ram-utilities-0.0.1.js',
	            'www/vendors/admin-services/dannyschreiber-services-0.0.1.js',
                'www/fixtures/setup.js',
                'www/fixtures/**/*.js',
                {
                    pattern: 'www/fixtures/**/*.json',
                    watched: true,
                    served: true,
                    included: false
                },
	            'www/src/modules.js',
                'www/src/app.js',
                'www/src/**/*.spec.js'
            ]
        },

        karma: {
            development: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'www/src/**/*.js'
                    ]
                }
            },
            dist: {
                options: {
                    configFile: 'karma.conf.js',
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
                    ]
                }
            },
            minified: {
                options: {
                    configFile: 'karma.conf.js',
                    files: [
                        '<%= meta.jsFilesForTesting %>',
                        'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js'
                    ]
                }
            }
        },
        jshint: {
            beforeconcat: ['www/src/**/*.js'],
	        options: {
		        smarttabs: true
	        },
            ignore_warning: {
                options: {
                    '-W030': true
                }
            }
        },

        concat: {
            dist: {
                src: ['www/src/modules.js', 'www/src/app.js','www/src/**/*.js', '!www/src/**/*.spec.js'],
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.js'
            },
	        dist_vendors: {
		        src: ['www/vendors/jquery/jquery.min.js',
			        'www/vendors/cloudinary/jquery.cloudinary.js',
			        'www/vendors/angular/angular.min.js',
			        'www/vendors/angular-animate/angular-animate.min.js',
                    'www/vendors/angularjs-toaster/toaster.js',
			        'www/vendors/cloudinary/angular.cloudinary.js',
			        'www/vendors/angular-ui-router/release/angular-ui-router.min.js',
			        'www/vendors/angular-bootstrap/ui-bootstrap.min.js',
			        'www/vendors/angular-sanitize/angular-sanitize.min.js',
			        'www/vendors/theme/js/jquery-migrate-1.2.1.min.js',
			        'www/vendors/theme/js/jquery.address-1.5.min.js',
			        'www/vendors/theme/js/triple.layout.js',
			        'www/vendors/theme/js/smoothscroll.js',
			        'www/vendors/theme/js/nprogress/nprogress.js',
			        'www/vendors/theme/js/fastclick.js',
			        'www/vendors/theme/js/jquery.imagesloaded.min.js',
			        'www/vendors/theme/js/jquery.isotope.min.js',
			        'www/vendors/theme/js/jquery.flexslider-min.js',
			        'www/vendors/theme/js/jquery.validate.min.js',
			        'www/vendors/theme/js/jquery.uniform.min.js',
			        'www/vendors/theme/js/jquery.fancybox-1.3.4.pack.js',
			        'www/vendors/theme/js/twitterFetcher_v10_min.js',
			        'www/vendors/ram-utilities/dist/ram-utilities-0.0.1.js',
			        'www/vendors/admin-services/dannyschreiber-services-0.0.1.min.js',
			        'www/vendors/dannyschreiber.net-0.0.1.js',
			        'www/vendors/theme/js/main.js'
		        ],
		        dest: 'dist/vendors.js'
	        },
            dist_css: {
                src:[
					'www/vendors/theme/css/bootstrap.css',
	                'www/vendors/theme/css/animate.css',
	                'www/vendors/theme/css/jquery.fancybox-1.3.4.css',
	                'www/src/assets/css/**/*.css',
	                'www/vendors/theme/css/flexslider.css',
	                'www/vendors/angularjs-toaster/toaster.css',
	                'www/vendors/theme/css/skins/overlay-bold.css',
	                '!www/src/assets/css/<%= pkg.namelower %>-<%= pkg.version %>.*'],
                dest:'dist/<%= pkg.namelower %>-<%= pkg.version %>.css'
            }
        },
        cssmin: {
            dist_css:{
                src: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.css',
                dest: 'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.css'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.namelower %>-<%= pkg.version %>.js'],
                    'dist/vendors.min.js': 'dist/vendors.js'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.js','<%= pkg.namelower %>-<%= pkg.version %>.min.js', 'vendors.js', 'vendors.min.js'],
                        dest: 'www/vendors/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.namelower %>-<%= pkg.version %>.css','<%= pkg.namelower %>-<%= pkg.version %>.min.css'],
                        dest: 'www/src/assets/css/'
                    }
                ]
            }
        },
        jsdoc: {
            src: ['www/src/**/*.js'],
            options: {
                destination: 'doc'
            }
        }
    });

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('build', [
        'jshint',
        'concat',
        'concat:dist_css',
        'uglify',
        'cssmin:dist_css',
        'copy:dist'
    ]);
    grunt.registerTask('build_with_tests',
        [
            'jshint',
            'karma:development',
            'concat',
            'concat:dist_css',
            'karma:dist',
            'uglify',
            'karma:minified',
            'cssmin:dist_css',
            'copy:dist',
            'jsdoc'
        ]);
};
