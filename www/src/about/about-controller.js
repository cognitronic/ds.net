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
			ac.profile = MainService.getProfile();
		    ac.words = ['software engineering', 'artistic exploration', 'writing and playing music'];
	    }
    };
	angular.module('ds').controller('AboutController', ['MainService', AboutController]);
})();