require("ble_led").setup(function(state) {
  if (state.on) {
    // state.r/g/b arr in the range 0..255
    LED1.pwm(state.r/256);
    LED2.pwm(state.g/256);
    LED3.pwm(state.b/256);
  } else {
    digitalWrite([LED1,LED2,LED3],0);
  }
});