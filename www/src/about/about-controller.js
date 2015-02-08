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

		    ac.words = ['software engineering', 'artistic exploration', 'writing and playing music', 'Brazilian Jiu Jitsu', 'learning new things'];
	    }
    };
	angular.module('ds').controller('AboutController', ['MainService', AboutController]);
})();