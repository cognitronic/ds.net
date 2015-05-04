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
		    var str = UtilityService.formatStringForURL(title);
		    $state.go('portfolio.detail', {title: str});
	    }

	    function viewProjectList(){
		    $state.go('projects');
	    }
    };
	angular.module('ds').controller('PortfolioController', ['MainService', 'UtilityService', '$state', PortfolioController]);
})();