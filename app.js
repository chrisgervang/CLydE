

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');


var util = require('util');
var exec = require('child_process').exec;

voiceURL = "http://localhost:59125/process?INPUT_TEXT=Goodmorning%20sir.%20The%20time%20is%209%20am,%20and%20its%20time%20to%20get%20up!%20Your%20first%20event%20is%20with%20Ryan%20at%20CoHo%20in%20one%20hour?&INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&AUDIO=WAVE_FILE&LOCALE=en_GB";

var app = express();

var baseURL = "https://api.spark.io/v1/devices/";

var deviceID = "48ff6e065067555050192387";

var accessToken = "427016082e1adc9172f7e6c32e810a26bcc6ebd8";

var spark = require('sparknode');

core = new spark.Core(accessToken,deviceID);
	
var HueApiRequire = require("node-hue-api"),
	HueApi = HueApiRequire.HueApi,
    LightState = HueApiRequire.lightState;

var hostname = "192.168.1.89",
    username = "4f09c4a1577c4d73c3e28b612e9f3f3"; // You can provide your own username value, but it is normally easier to leave it to the Bridge to create it
    //userDescription = "Gervang",
    //state = lightState.create();

var displayUserResult = function(result) {
    console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
    console.log(err);
};

hue = new HueApi(hostname, username);

hue.groups(function(err, config) {
    if (err) throw err;
    console.log(config);
});

var states = {
    rainy: LightState.create().on().rgb(0, 0, 255).brightness(80),
    cold: LightState.create().on().rgb(255,0,0).brightness(80),
    sunny: LightState.create().on().white(500, 80),
    off: LightState.create().off(),
    on: LightState.create().on().white(400, 90)
};

var hueState = false;

// hue.setGroupLightState(0, state.effect('none'), function(err, result) {
//     if (err) throw err;
//     console.log(result);
// });


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/curtain', function(request, response){
	response.send("opening shades");
	speak("Hello Sir, I'll open or close the curtains");
	
	//doMethod("motorOn", "motorOn");
	/*var command = 'curl --data "motorOn" https://api.spark.io/v1/devices/48ff6e065067555050192387/motorOn?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
	child = exec(command, function(error, stdout, stderr){

		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);

		if(error !== null)
		{
		    console.log('exec error: ' + error);
		}

	});*/

	core.motorOn('motorOn', function(err, data) {
	  console.log(data);
	});
});

var lightState = false;

app.get('/goodnight', function(request, response){
	response.send("goodnight sir!");
	
	speak("Goodnight sir!");
	
	core.fade("0,20,A", function(err, data) {
		console.log(data);
	});

	hue.setGroupLightState(0, states.off, function(err, result) {
    if (err) throw err;
    	console.log(result);
	});
});

app.get('/goToWork', function(request, response){
	//close blind
	core.motorOn('motorOn', function(err, data) {
	  console.log(data);
	});
	//fade lights
	lightState = false;
	hue.setGroupLightState(0, states.off, function(err, result) {
    if (err) throw err;
    	console.log(result);
	});
	core.fade("0,20,A", function(err, data) {
	  console.log(data);
	});
});

app.get('/second', function(request, response){
	response.send("BOAT");
});


//
app.get('/toggleLights', function(request, response){
	//options:
	//closet
	//room
	//both
	var lightsConfig = request.query["params"].split(',');


	response.send("toggleing lights");

	//speak("Hello Sir, Let's toggle the lights!");
	if (lightsConfig[0] == "both") {
		var command;
		core.dimLED(function(err, value) {
			if (value > 0) {
				//doMethod("fade","0,20,A");
				command = "0,20,A";
				lightState = false;
				hue.setGroupLightState(0, states.off, function(err, result) {
			    if (err) throw err;
			    	console.log(result);
				});
			} else {
				//doMethod("fade","255,20,A");
				command = "255,20,A";
				lightState = true;
				// hue.setGroupLightState(0, state.on().white)
				hue.setGroupLightState(0, states.on, function(err, result) {
			    if (err) throw err;
			    	console.log(result, "BOAT");
				});
			}
			core.fade(command, function(err, data) {
			  console.log(data, command);
			});
		});
	} else if (lightsConfig[0] == "closet") {
		var command;
		core.dimLED(function(err, value) {
			if (value > 0) {
				//doMethod("fade","0,20,A");
				command = "0,20,A";
				lightState = false;
			} else {
				//doMethod("fade","255,20,A");
				command = "255,20,A";
				lightState = true;
				// hue.setGroupLightState(0, state.on().white)
			}
			core.fade(command, function(err, data) {
				console.log(data, command);
			});
		});
	} else if (lightsConfig[0] == "room") {

	}
});

var lightDim = 0;

app.get('/dimLights', function(request, response){
	response.send("dimming lights");

	//255,20,A <-request
	var config = request.query['params'].split(',');
	console.log(config);

	var sparkLight = Math.floor(config[0] * 255/100);
	console.log(sparkLight, "SPARK");


	if (config[0] < lightDim) {
		//Hold on a second while I set the mood. Dimming the lights to {config[0]}
  		speak("Hello Sir, Hold on a second while I set the mood. Dimming the lights to " + config[0] + "percent");
	} else if (config[0] > lightDim) {
		//
		speak("Hello Sir, Hold on a second while I set the mood. Raising the lights to " + config[0] + "percent");
	}
	
	//doMethod("fade",request.query['params']);
	core.fade(sparkLight + "," + config[1] + "," + config[2], function(err, data) {
	  console.log(data, request.query['params']);
	});

	var hueState;
	hue.getGroup(0, function(err, result) {
    	if (err) throw err;
    		console.log(result);
    	hueState = result;
	

		if (config[0] === '0') {
			hue.setGroupLightState(0, states.off, function(err, result) {
	    	if (err) throw err;
	    		console.log(result, "BOAT1");
			});
			hueState = false;
		} else {
			if(hueState.lastAction.on == false) {
				hue.setGroupLightState(0, LightState.create().on().white(450,config[0]), function(err, result) {
			    if (err) throw err;
			    	console.log(result, "BOAT2");

			  //   	hue.setGroupLightState(0, state.white(450,config[0]), function(err, result) {
				 //    if (err) throw err;
				 //    	console.log(result, "BOAT3");
					// });

					hue.getGroup(0, function(err, result) {
	    				if (err) throw err;
	    				console.log("AFTER", result);
	    			});
				});
				hueState = true;
			} else {
				hue.setGroupLightState(0, LightState.create().on().white(450,config[0]), function(err, result) {
				    if (err) throw err;
				    	console.log(result, "BOAT");
				});
				hue.getGroup(0, function(err, result) {
	    			if (err) throw err;
	    			console.log("AFTER", result);
	    		});
				hueState = true;
			}
			

			
		}
	});
		


	

	

	// var command = 'curl --data "args='+ request.query['params'] +'" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
	// child = exec(command, function(error, stdout, stderr){
	// 	console.log('stdout: ' + stdout);
	// 	console.log('stderr: ' + stderr);
	// 	if(error !== null) {
	// 	    console.log('exec error: ' + error);
	// 	}
	// });
});

app.get('/wake', function(request, response){
	response.send("waking up");
	// //255,20,A <-request

	//speak('Good morning Chris. It\'s Sunday January 26th and It\'s time to get out of bed. Your first event today is at nine AM with Ryan Atallah');
	
	wake();
	
});

app.get('/color', function(request, response){

	var color = request.query["rgb"].split(",");
	console.log(color)
	for (var i = color.length - 1; i >= 0; i--) {
		color[i] = parseInt(color[i])
	};
	response.send("waking up");
	hue.setGroupLightState(0, LightState.create().on().rgb(color[0],color[1],color[2]).brightness(90), function(err, result) {
    if (err) throw err;
    	console.log(result);
	});
	
});

app.get('/clyde', function(request, response){
	response.send("waking up");
	// //255,20,A <-request

	speak('Hello there. I\'m Clide! Let\'s have some fun');
	
});

function speak(words) {	

	var command = 'osascript /Users/chrisgervang/CLydE/speak.scpt "' + words + '"';
	console.log(words);

	child = exec(command, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(error !== null) {
		    console.log('exec error: ' + error);
		}
	});

}

function wake() {
	



	// var command = 'osascript /Users/chrisgervang/CLydE/spotify.scpt;'
	// child = exec(command, function(error, stdout, stderr){
	// 	console.log('stdout: ' + stdout);
	// 	console.log('stderr: ' + stderr);
	// 	if(error !== null) {
	// 	    console.log('exec error: ' + error);
	// 	}
		//doMethod("fade","255,500,A");
		//doMethod("motorOn", "motorOn");
		// var command = 'curl --data "args=255,500,A" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
		// child = exec(command, function(error, stdout, stderr){
		// 	console.log('stdout: ' + stdout);
		// 	console.log('stderr: ' + stderr);
		// 	if(error !== null) {
		// 	    console.log('exec error: ' + error);
		// 	}
		// });
			hue.setGroupLightState(0, LightState.create().on().transition(5).white(450, 70), function(err, result) {
		    if (err) throw err;
		    	console.log(result, "BOAT");
			});

	// core.fade("255,500,A", function(err, data) {
	//   console.log(data);
	  	
	// });
		setTimeout(function() {
	    	console.log("ping");
	    	core.motorOn("motorOn", function(err, data) {
		  		console.log(data);
			});
		},1000);
	

		// var commandtwo = 'curl --data "motorOn" https://api.spark.io/v1/devices/48ff6e065067555050192387/motorOn?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
		// child = exec(commandtwo, function(error, stdout, stderr){
		// 	console.log('stdout: ' + stdout);
		// 	console.log('stderr: ' + stderr);
		// 	if(error !== null) {
		// 	    console.log('exec error: ' + error);
		// 	}
		// });
	// });

	

	

}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function onMethodSuccess() {
    console.log("SUCCESS");
    // alert = $("#info-alert");
    // alert.text("Success!").removeClass("alert-danger").addClass("alert-success");
    // alert.show();
    // setTimeout(function() {
    //   alert.hide();
    // }, 2000);
}

function onMethodFailure() {
console.log("FAIL");
// alert = $("#info-alert");
// alert.text("Ruh roh!").removeClass("alert-success").addClass("alert-danger");
// alert.show();
// setTimeout(function() {
//   alert.hide();
// }, 2000);
}

function doMethod(method, data) {
    var url = baseURL + deviceID + "/" + method;
    $.ajax({
      type: "POST",
      url: url,
      data: { access_token: accessToken, args: data },
      success: onMethodSuccess,
      dataType: "json"
    }).fail(function(obj) {
      onMethodFailure();
    });
}

// request("https://www.googleapis.com/calendar/v3/calendars/chrisgervang%40gmail.com/events?maxAttendees=1&singleEvents=true&timeMin=2014-01-25T0%3A00%3A00.118z&fields=description%2Citems(location%2Cstart%2Csummary)&key={AIzaSyCByn2U9c5YUNuV3dsv0waSOxSFWpezzt8}", function(error, response, body) {
//   console.log(body);
// });