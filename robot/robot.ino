// Use this code to test your motor with the Arduino board:

// if you need PWM, just use the PWM outputs on the Arduino
// and instead of digitalWrite, you should use the analogWrite command

// Bit masks for commands
#define FULL_STOP 0xc0
#define AXIS_Y 0x20
#define DIRECTION_POS 0x10
#define SPEED_MASK 0x0f

// Motor pins
int motor_y[] = {2, 5};
int motor_x[] = {6, 9};

void setup() {
  Serial.begin(9600);

  // Setup motors
  int i;
  for (i = 0; i < 2; i++) {
    pinMode(motor_y[i], OUTPUT);
    pinMode(motor_x[i], OUTPUT);
  }

  digitalWrite(motor_x[0], LOW);
  digitalWrite(motor_x[1], LOW);
  digitalWrite(motor_y[0], LOW);
  digitalWrite(motor_y[1], LOW);
}

void loop() {
  if (Serial.available()) {
    uint8_t command;
    Serial.readBytes(&command, 1);

    // Determine whether to full stop motors or not
    if (command & FULL_STOP) {
      digitalWrite(motor_x[0], LOW);
      digitalWrite(motor_x[1], LOW);
      digitalWrite(motor_y[0], LOW);
      digitalWrite(motor_y[1], LOW);
    } else {
      uint8_t axis = 0;
      if (command & AXIS_Y) {
        axis = 1;
      }

      // Determine the direction (neg or pos)
      uint8_t dir = 0;
      if (command & DIRECTION_POS) {
        dir = 1;
      }

      // Determine the speed
      //TODO: Should be command & SPEED_MASK?
      uint8_t spd = command & SPEED_MASK;
      //TODO: This line creates a quadratic releationship between what should be linear speed values. It would be better to multiply by a constant.
      spd = spd * 16;

      // Write the motor speeds
      switch (axis) {
        case 0:
          // X-axis
          switch (dir) {
            case 0:
              // Negative direction
              analogWrite(motor_x[0], LOW);
              analogWrite(motor_x[1], spd);
              break;
            default:
              // Positive direction
              analogWrite(motor_x[0], spd);
              analogWrite(motor_x[1], LOW);
              break;
          }
          break;
        default:
          // Y-axis
          switch (dir) {
            case 0:
              // Negative direction
              analogWrite(motor_y[0], LOW);
              analogWrite(motor_y[1], spd);
              break;
            default:
              // Positive direction
              analogWrite(motor_y[0], spd);
              analogWrite(motor_y[1], LOW);
              break;
          }
          break;
      }
    }
  } else {
    // If serial is not available, shut down to prevent damage.
    digitalWrite(motor_x[0], LOW);
    digitalWrite(motor_x[1], LOW);
    digitalWrite(motor_y[0], LOW);
    digitalWrite(motor_y[1], LOW);
  }
  // Wait 25 ms to allow settling
  //TODO: If multiple messages are sent within a span of 25 milliseconds, this could be bad.
  delay(25);
}

