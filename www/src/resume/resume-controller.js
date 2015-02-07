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
					console.log('resume ', data);
					rc.resume = data[0];
				});
	    }
    };
	angular.module('ds').controller('ResumeController', ['ResumeService', ResumeController]);
})();