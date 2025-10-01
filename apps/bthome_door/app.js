if (E.getBattery===undefined)
  E.getBattery = ()=>100;

var slowTimeout; //< After 60s we revert to slow advertising

// https://www.espruino.com/BTHome
// Update the data we're advertising here
function updateAdvertising(buttonState) {
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
      type: "button_event",
      v: buttonState
    },
  ]), {
    name : "Door",
    manufacturer : false, ///< turn off manufacturer data advertising (enabled by default in 2v26, interferes with BTHome)
    interval: (buttonState!="none")?20:2000, // fast when we have a button press, slow otherwise
    // not being connectable/scannable saves power (but you'll need to reboot to connect again with the IDE!)
    //connectable : false, scannable : false,
  });
  /* After 60s, call updateAdvertising again to update battery/temp
  and to ensure we're advertising slowly */
  if (slowTimeout) clearTimeout(slowTimeout);
  slowTimeout = setTimeout(function() {
    slowTimeout = undefined;
    updateAdvertising("none" /* no button pressed */);
  }, 60000);
}

// Update advertising now
updateAdvertising("none");

// Enable highest power advertising (4 on nRF52, 8 on nRF52840)
NRF.setTxPower(4);


// https://www.espruino.com/Puck.js+Door+Light
var zero = Puck.mag();
var doorOpen = false;
function onMag(p) {
  p.x -= zero.x;
  p.y -= zero.y;
  p.z -= zero.z;
  var s = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z);
  var open = s<1000;
  if (open!=doorOpen) {
    doorOpen = open;
    digitalPulse(open ? LED1 : LED2, 1,1000);
    updateAdvertising(open  ? "long_press" : "press");
  }
}
Puck.on('mag', onMag);
Puck.magOn();