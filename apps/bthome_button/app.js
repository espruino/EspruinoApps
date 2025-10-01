if (E.getBattery===undefined)
  E.getBattery = ()=>100;

var slowTimeout; //< After 60s we revert to slow advertising
//https://www.espruino.com/BTHome

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
      v: buttonState ? "press" : "none"
    },
  ]), {
    name : "Sensor",
    manufacturer : false, ///< turn off manufacturer data advertising (enabled by default in 2v26, interferes with BTHome)
    interval: buttonState?100:2000, // fast when we have a button press, slow otherwise
    // not being connectable/scannable saves power (but you'll need to reboot to connect again with the IDE!)
    //connectable : false, scannable : false,
  });
  /* After 60s, call updateAdvertising again to update battery/temp
  and to ensure we're advertising slowly */
  if (slowTimeout) clearTimeout(slowTimeout);
  slowTimeout = setTimeout(function() {
    slowTimeout = undefined;
    updateAdvertising(false /* no button pressed */);
  }, 60000);
}

// When a button is pressed, update advertising with the event
setWatch(function() {
  updateAdvertising(true /* button pressed */);
}, BTN, {edge:"rising", repeat:true})

// Update advertising now
updateAdvertising();

// Enable highest power advertising (4 on nRF52, 8 on nRF52840)
NRF.setTxPower(4);
