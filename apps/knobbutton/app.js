/**
 * Copyright reelyActive 2022-2024
 * We believe in an open Internet of Things
 */


// User-configurable constants
const LED_BLINK_MILLISECONDS = 50;
const STABLE_ACCELERATION_TOLERANCE_G = 0.1;
const ANGLE_ADVERTISING_DURATION_MILLISECONDS = 5000;
const ANGLE_ADVERTISING_PERIOD_MILLISECONDS = 500;
const NAME_ADVERTISING_PERIOD_MILLISECONDS = 5000;


// Non-user-configurable constants
const ACC_SAMPLE_RATE_HZ = 12.5; // Valid values are 1.6, 12.5, 26, 52, 104, 208
const ACC_PER_G = 8192;
const DEG_PER_RAD = 180 / Math.PI;


// Global variables
let advertisingTimeoutId;


// Calculate the angle of rotation based on the given accelerometer reading
function calculateAngleOfRotation(acc) {
  let ratioXY = ((acc.y === 0) ? Infinity : Math.abs(acc.x / acc.y));
  let ratioYX = ((acc.x === 0) ? Infinity : Math.abs(acc.y / acc.x));

  if((acc.x >= 0) && (acc.y >= 0)) {
    return Math.round(Math.atan(ratioYX) * DEG_PER_RAD);
  }
  if((acc.x <= 0) && (acc.y >= 0)) {
    return Math.round(90 + (Math.atan(ratioXY) * DEG_PER_RAD));
  }
  if((acc.x <= 0) && (acc.y <= 0)) {
    return Math.round(180 + (Math.atan(ratioYX) * DEG_PER_RAD));
  }
  if((acc.x >= 0) && (acc.y <= 0)) {
    return Math.round(270 + (Math.atan(ratioXY) * DEG_PER_RAD));
  }
}


// Advertise the name "Knob.js"
function advertiseName() {
  NRF.setAdvertising({}, {
      showName: false,
      manufacturer: 0x0590,
      manufacturerData: JSON.stringify({ name: "Knob.js" }),
      interval: NAME_ADVERTISING_PERIOD_MILLISECONDS
  });
}


// Advertise the angle of rotation for a specific period
function advertiseAngleOfRotation(angleOfRotation) {
  if(advertisingTimeoutId) {
    clearTimeout(advertisingTimeoutId);
  }

  NRF.setAdvertising({}, {
      showName: false,
      manufacturer: 0x0590,
      manufacturerData: JSON.stringify({ angleOfRotation: angleOfRotation }),
      interval: ANGLE_ADVERTISING_PERIOD_MILLISECONDS
  });

  advertisingTimeoutId = setTimeout(advertiseName,
                                    ANGLE_ADVERTISING_DURATION_MILLISECONDS);
}


// Handle a button press: blink green LED and initiate accelerometer readings
function handleButton() {
  Puck.accelOn(ACC_SAMPLE_RATE_HZ);
  LED2.write(true);
  setTimeout(function() { LED2.write(false); }, LED_BLINK_MILLISECONDS);
}


// Handle accelerometer reading: terminate accelerometer readings and advertise
//                               angle of rotation once magnitude is stable
function handleAcceleration(data) {
  let magnitude = Math.sqrt((data.acc.x * data.acc.x) +
                            (data.acc.y * data.acc.y) +
                            (data.acc.z * data.acc.z)) / ACC_PER_G;
  let isStableMagnitude = (magnitude < 1.0 + STABLE_ACCELERATION_TOLERANCE_G) &&
                          (magnitude > 1.0 - STABLE_ACCELERATION_TOLERANCE_G);

  if(isStableMagnitude) {
    let angleOfRotation = calculateAngleOfRotation(data.acc);

    Puck.accelOff();
    advertiseAngleOfRotation(angleOfRotation);
  }
}


// Advertise "Knob.js", wake on button press and handle accelerometer readings
advertiseName();
Puck.on('accel', handleAcceleration);
setWatch(handleButton, BTN, { edge: "rising", repeat: true, debounce: 50 });