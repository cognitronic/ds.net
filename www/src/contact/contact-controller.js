/**
 * Created by Danny Schreiber on 2/4/2015.
 */

(function(){ 'use strict';
    var ContactController = function(MainService, EmailService, toaster){
		var cc = this;
		cc.email = {};

	    cc.init = init;
		cc.sendEmail = sendEmail;

	    init();

	    function init(){

	    }

	    function sendEmail(email){
		    var msg = {
			    fromEmail: email.fromEmail,
			    toEmail: 'danny@ravenartmedia.com',
			    subject: email.subject,
			    textMessage: email.htmlMessage,
			    htmlMessage: 'Name: ' + email.name + ' <br/><br />'
		    };
		    msg.htmlMessage += '<br /><br />' + email.htmlMessage;
			EmailService.sendMail(msg)
				.then(function(data){
					if(data.rejected.length < 1){
						cc.email = {};
						toaster.pop('success', 'Message Sent', "Thanks for reaching out, I'll get back to you as soon as I can!");
					}
				});
	    }
    };
	angular.module('ds').controller('ContactController', ['MainService', 'EmailService', 'toaster', ContactController]);
})();