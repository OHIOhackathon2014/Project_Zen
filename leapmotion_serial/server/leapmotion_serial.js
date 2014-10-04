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
					var num = 196 * (velocity === 0 ? 1 : 0) + y * 32 + (velocity < 0 ? 0 : 1) * 16 + Math.abs(velocity); 
					var buff = new Buffer(1);
					buff.writeUInt8(num, 0);
					console.log(buff);
					arduino.write(buff);
				}
			});
		}	
	});
});
