var a,rx,ry;

// https://www.espruino.com/BTHome
// Update the data we're advertising here
function updateAdvertising() {
  // read accelerometer
  a = Puck.accel().acc;
  // calculate angle
  rx = Math.atan2(a.x,a.z)*180/Math.PI;
  ry = Math.atan2(a.y,a.z)*180/Math.PI;

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
      type : "rotation",
      v : rx
    },
    {
      type : "rotation",
      v : ry
    },
  ]), {
    name : "Rot", interval:1000,
    // not being connectable/scannable saves power (but you'll need to reboot to connect again with the IDE!)
    //connectable : false, scannable : false,
  });
}

NRF.setTxPower(4);
updateAdvertising();
setInterval(updateAdvertising, 60000); // 1 minute