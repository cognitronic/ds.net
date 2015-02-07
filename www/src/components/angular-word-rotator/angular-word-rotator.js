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