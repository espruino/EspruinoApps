const TIMEOUT = 10000; // 10s
// using code from https://www.espruino.com/Puck.js#accelerometer-gyro
// and https://www.espruino.com/BTHome

// Timeout to consider movement stopped
var idleTimeout;
// Are we moving?
var isMoving = false;

function updateAdvertising() {
  NRF.setAdvertising(require("BTHome").getAdvertisement([
    {
      type : "battery",
      v : E.getBattery()
    },
    {
      type : "temperature",
      v : E.getTemperature()
    },
    {
      type : "moving",
      v : isMoving
    },
  ]), {
    name : "Movement",
    interval: 600,
    manufacturer : false, ///< turn off manufacturer data advertising (enabled by default in 2v26, interferes with BTHome)
    // not being connectable/scannable saves power (but you'll need to reboot to connect again with the IDE!)
    //connectable : false, scannable : false,
  });
}

function onIdle() {
  idleTimeout = undefined;
  isMoving = false;
  updateAdvertising();
  //LED.reset();
}

require("puckjsv2-accel-movement").on();
Puck.on('accel',function(a) { "ram"
  //LED.set();
  if (idleTimeout) clearTimeout(idleTimeout);
  else {
    isMoving = true;
    updateAdvertising();
  }
  idleTimeout = setTimeout(onIdle, TIMEOUT);
});
// turn off with require("puckjsv2-accel-movement").off();

// Update advertising state every 2 minutes to update battery/temp
setInterval(updateAdvertising, 2*60000);