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

//Pin confimation feature
function checkPinAndExecute(actionFunction) {
  const enteredPin = prompt("Enter your PIN:");
  if (enteredPin === userPin) {
    actionFunction();
  } else {
    alert("Incorrect PIN. Action Failed!");
  }
}

//Deposit feature
function deposit() {
  const amount = prompt("Enter the amount to deposit:");
  const depositAmount = parseFloat(amount);
  if (!isNaN(depositAmount) && depositAmount > 0) {
    balance = balance + depositAmount;
    // transactionHistory.push(Deposit: $${numericAmount.toFixed(2)});
    alert(
      `Deposit of $${depositAmount.toFixed(
        2
      )} successful. Your new balance is $${balance.toFixed(2)}.`
    );
  } else {
    alert("Invalid deposit amount.");
  }
}
