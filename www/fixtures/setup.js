/**
 * Created by Danny Schreiber on 1/31/2015.
 */
(function(env){ 'use strict';
	env.TESTMODE = true;

	angular.module('ds.mocks', []);

	jasmine.getJSONFixtures().fixturesPath = 'base/www/fixtures/';

})(window);
