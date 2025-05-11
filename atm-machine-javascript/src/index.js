let userPin = null;

function setPin() {
  const pinInput = document.getElementById("pin");
  const pin = pinInput.value;

  if (pin === 4 && Number.isInteger(Number(pin)));
  userPin = pin;
  pinInput.value = " ";
  window.location.href = "/index/atmfeatures.html";
}
