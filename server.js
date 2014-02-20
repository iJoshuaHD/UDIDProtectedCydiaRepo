var express = require('express');
var app 	= express();
var fs		= require('fs');
app.listen(3149);

// Private Repo
app.get('//:file', function(req, res) {

	if(udidAllowed(req.headers['x-unique-id']))
	{
		var file = './private/' + req.params['file'];

		fs.exists(file, function(fileExists) {
			if(fileExists) res.sendfile(file);
			else res.status(404).send('');
		});
	}
	else res.status(401).send('You are unauthorized to view this page.');
});

// Public Repo
app.get('/:file', function(req, res) {

	var file = './public/' + req.params['file'];

	fs.exists(file, function(fileExists) {
		if(fileExists) res.sendfile(file);
		else res.status(404).send('');
	});
});

// Array of allowed UDID strings for private repo
var udids = [];

function udidAllowed(udid) 
{
    for (var i = 0; i < udids.length; i++) if (udids[i] == udid) return true;

    return false;
}

app.get('/', function(req, res) {res.send('Please install this in Cydia!')});
