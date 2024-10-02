var counter = 0; // number of impulses
var power = 0; // power in watts (assuming 1000imp/kwh)
var lastPulse = getTime();

// Update BLE advertising
function update() {
  NRF.setAdvertising(require("BTHome").getAdvertisement([
    {
      type : "battery",
      v : E.getBattery()
    }, {
      type : "energy",
      v : counter/1000 // kWh, and usualy 1000 imp/kWh
    }, {
      type : "power",
      v : power // kWh, and usualy 1000 imp/kWh
    }
  ]), {
    name : "Electricity",
    // not being connectable/scannable saves power (but you'll need to reboot to connect again with the IDE!)
    //connectable : false, scannable : false,
  });
}

// Set up pin states
D1.write(0);
pinMode(D2,"input_pullup");
// Watch for pin changes
setWatch(function(e) {
  let timeDiff = e.time - lastPulse;
  power = 3600 / timeDiff; // 1000imp/kwh -> 1000 pulses in 3600sec = 1kW
  counter++;
  update();
  lastPulse = e.time;
  digitalPulse(LED1,1,1); // show activity
}, D2, { repeat:true, edge:"falling" });
update();