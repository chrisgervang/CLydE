
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

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/curtain', function(request, response){
	response.send("opening shades");

	var command = 'curl --data "motorOn" https://api.spark.io/v1/devices/48ff6e065067555050192387/motorOn?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
	child = exec(command, function(error, stdout, stderr){

		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);

		if(error !== null)
		{
		    console.log('exec error: ' + error);
		}

	});
});

var lightState = false;


//
app.get('/toggleLights', function(request, response){
	response.send("toggleing lights");

	speak("Let's toggle the lights!");
	
	var command;

	if (lightState) {
		command = 'curl --data "args=0,20,A" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
		lightState = false;
	} else {
		command = 'curl --data "args=255,20,A" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
		lightState = true;
	}
	

	child = exec(command, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(error !== null) {
		    console.log('exec error: ' + error);
		}
	});
});

var lightDim = 0;

app.get('/dimLights', function(request, response){
	response.send("dimming lights");

	//255,20,A <-request
	var config = request.query['params'].split(',');
	console.log(config);



	if (config[0] < lightDim) {
		//Hold on a second while I set the mood. Dimming the lights to {config[0]}
  		speak("Hold on a second while I set the mood. Dimming the lights to " + config[0]);
	} else if (config[0] > lightDim) {
		//
		speak("Hold on a second while I set the mood. Raising the lights to " + config[0]);
	}
	
	var command = 'curl --data "args='+ request.query['params'] +'" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
	child = exec(command, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(error !== null) {
		    console.log('exec error: ' + error);
		}
	});
});

app.get('/wake', function(request, response){
	response.send("waking up");

	// //255,20,A <-request
	// var config = request.query['params'].split(',');
	// console.log(config);


	speak('Goodmorning Chris. It\'s Sunday January 26th and It\'s time to get out of bed. Your first event today is at nine AM with Ryan Atallah');
	
	wake();
	
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
	var command = 'osascript /Users/chrisgervang/CLydE/spotify.scpt;'
	child = exec(command, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(error !== null) {
		    console.log('exec error: ' + error);
		}

		var command = 'curl --data "args=255,500,A" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
		child = exec(command, function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if(error !== null) {
			    console.log('exec error: ' + error);
			}
		});

		var commandtwo = 'curl --data "motorOn" https://api.spark.io/v1/devices/48ff6e065067555050192387/motorOn?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
			child = exec(commandtwo, function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if(error !== null) {
			    console.log('exec error: ' + error);
			}
		});
	});

	

	

}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// var command = 'curl --data "args=230,50,A" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';
// //var command = 'curl --data "motorOn" https://api.spark.io/v1/devices/48ff6e065067555050192387/motorOn?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';


// child = exec(command, function(error, stdout, stderr){

// 	console.log('stdout: ' + stdout);
// 	console.log('stderr: ' + stderr);

// 	if(error !== null)
// 	{
// 	    console.log('exec error: ' + error);
// 	}

// });


// request("https://www.googleapis.com/calendar/v3/calendars/chrisgervang%40gmail.com/events?maxAttendees=1&singleEvents=true&timeMin=2014-01-25T0%3A00%3A00.118z&fields=description%2Citems(location%2Cstart%2Csummary)&key={AIzaSyCByn2U9c5YUNuV3dsv0waSOxSFWpezzt8}", function(error, response, body) {
//   console.log(body);
// });