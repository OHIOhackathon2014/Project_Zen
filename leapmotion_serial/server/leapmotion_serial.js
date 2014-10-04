function getDValue(velocity) {
	var d;
	if (velocity === 0) d = 2;
	else if (velocity < 0) d = 1;
	else d = 0;
	return d;
}

Meteor.startup(function () {
	var SerialPort = serialport.SerialPort;
	var arduino = new SerialPort("/dev/ttyACM1", {
		baudrate: 9600
	});
	arduino.open(function(err) {
		if (err) {
			console.log("Failed to open: " + err);
		} else {
			console.log("Serial port open");
			Meteor.methods({
				writeData: function(velocity, y) {
					var firstByte = 8 * y + 4 * (velocity === 0 ? 1 : 0) + getDValue(velocity);
					var secondByte = Math.abs(velocity);
					console.log(firstByte + " " + secondByte);
					arduino.write(String.fromCharCode(firstByte) + String.fromCharCode(secondByte));
				}
			});
		}	
	});
});
