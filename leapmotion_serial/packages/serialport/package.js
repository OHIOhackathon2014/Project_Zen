Package.describe({summary: "A serial communication client."});

Npm.depends({
	'serialport': '1.4.6'
});

Package.on_use(function(api) {
	api.add_files("serialport.js", "server");
	api.export("serialport");
});
