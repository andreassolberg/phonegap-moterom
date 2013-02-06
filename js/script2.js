define(function(require, exports, module) {

	var 
		$ = require('jquery'),
		UWAP = require('uwap-core/js/core')
    	;

	require('uwap-core/bootstrap/js/bootstrap');	
	
	require('uwap-core/bootstrap/js/bootstrap-modal');
	require('uwap-core/bootstrap/js/bootstrap-collapse');
	require('uwap-core/bootstrap/js/bootstrap-button');
	require('uwap-core/bootstrap/js/bootstrap-dropdown');
	
	UWAP.utils.jso_configure({
		"uwap": {
			client_id: "app_moterom",
			authorization: UWAP.utils.getEngineURL('/api/oauth/authorization'),
			redirect_uri: "https://moterom.uwap.org/_/passiveResponse"
		}
	});



	var runapp = function() {

		var loggedin = function (user) {
			$("div#out").empty().prepend('<p>Logged in as <strong>' + user.name + '</strong> (<tt>' + user.userid + '</tt>)</p>');
			var gr = $('<dl></dl>')
			if(user.groups) {
				groups = user.groups;
				for(var key in user.groups) {
					gr.append('<dt>' + user.groups[key] + '</dt>');
					gr.append('<dd><tt>' + key + '</tt></dd>');
				}
			}
			$("div#out").append('<p>Groups:</p>').append(gr);
		}

		var notloggedin = function() {
			$("div#out").empty().append('not logged in');
		}

		$("#dashboard").on('click', '#req', function(e) {
			e.preventDefault(); e.stopPropagation();
			UWAP.auth.require(loggedin);
		});

		$("#dashboard").on('click', '#check', function(e) {
			e.preventDefault(); e.stopPropagation();
			UWAP.auth.check(loggedin, notloggedin);
		});

		$("#dashboard").on('click', '#logout', function(e) {
			e.preventDefault(); e.stopPropagation();
			UWAP.auth.logout();
		});

		

	}

	runapp();

	document.addEventListener("deviceready", runapp, false);

});
