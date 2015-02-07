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