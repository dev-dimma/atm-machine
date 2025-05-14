let userPin = null;
let balance = 5000;

function setPin() {
  const pinInput = document.getElementById("pin");
  const pin = pinInput.value.trim();

  if (pin.length === 4 && Number.isInteger(Number(pin))) {
    userPin = pin;
    pinInput.value = "";
    document.getElementById("pin-setup").style.display = "none";
    document.getElementById("atm-features-setup").style.display = "block";
  } else {
    alert("Please enter a valid 4-digit PIN.");
  }
}

function checkPinAndExecute(actionFunction) {
  const enteredPin = prompt("Enter your PIN:");
  if (enteredPin === userPin) {
    actionFunction();
  } else {
    alert("Incorrect PIN. Action Failed!");
  }
}
