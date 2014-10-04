Meteor.startup(function () {
	var SerialPort = serialport.SerialPort;
	var arduino = new SerialPort("/dev/ttyACM0", {
		baudrate: 9600
	});
	arduino.open(function(err) {
		if (err) {
			console.log("Failed to open: " + err);
		} else {
			console.log("Serial port open");
			Meteor.methods({
				writeData: function(velocity, y) {
					var byte = [196 * (velocity === 0 ? 0 : 1) + y * 32 + (velocity < 0 ? 0 : 1) * 16 + Math.abs(velocity)];
					var buff = new Buffer(byte);
					console.log(buff.toString('utf8'));
					arduino.write(buff.toString('utf8'));
				}
			});
		}	
	});
});
