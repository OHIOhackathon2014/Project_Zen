Meteor.startup(function () {
	var SerialPort = serialport.SerialPort;
	/*var arduino = new SerialPort("/dev/ttyACM0", {
		baudrate: 9600
	});
	arduino.open(function(err) {
		if (err) {
			console.log("Failed to open: " + err);
		} else {
			console.log("Serial port open");
			arduino.write("Hello World!");
		}	
	});*/
});
