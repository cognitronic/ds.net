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