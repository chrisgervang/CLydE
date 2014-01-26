
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var spark = require('sparkcloud')('ac427016082e1adc9172f7e6c32e810a26bcc6ebd8', 30000);
//spark.access_token = "access_token=ac427016082e1adc9172f7e6c32e810a26bcc6ebd8";

//var core = spark.device('53ff6c065067544829381287');

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var util = require('util');
var exec = require('child_process').exec;

var command = 'curl --data "args=220,10,A" https://api.spark.io/v1/devices/48ff6e065067555050192387/fade?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8';

child = exec(command, function(error, stdout, stderr){

console.log('stdout: ' + stdout);
console.log('stderr: ' + stderr);

if(error !== null)
{
    console.log('exec error: ' + error);
}

});

// var spawn = require('child_process').spawn,
//     curl = spawn('curl --data', ['https://api.spark.io/v1/devices/48ff6e065067555050192387/motorOn?access_token=427016082e1adc9172f7e6c32e810a26bcc6ebd8'])
//     data = '',
// 	err  = null;

// curl.stdout.on('data', function(chunk) {
// 	    data += chunk;
// 	});
 
// 	curl.stderr.on('data', function(err_msg) {
// 	    if (err === null) { err = ''; }
// 		err += err_msg;
// 	});
 
// 	curl.on('exit', function(exit_code) {
// 	    console.log(err, err, data);
// 	    //callback(err, err, data);
// 	});