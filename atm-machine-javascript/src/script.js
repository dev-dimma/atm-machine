let userPin = null;
let balance = 5000;

//Pin feature
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

//Withdrawal feature
function withdraw() {
  const amount = prompt("Enter the amount to withdraw:");
  const numericAmount = parseFloat(amount);

  if (
    !isNaN(numericAmount) &&
    numericAmount > 0 &&
    numericAmount % 10 === 0 &&
    numericAmount <= balance
  ) {
    balance = balance - numericAmount;
    alert(`
      Withdrawal succesful! Dispensed: $${numericAmount}. New Balance is $${balance}
    `);
  } else {
    alert("Invalid amount or insufficient funds");
  }
}

//Transfer feature
function transfer() {
  const recipientAccountNumber = prompt(
    "Enter the reciepient's account number:"
  );
  const transferAmount = parseFloat(prompt("Enter the amount to transfer:"));

  if (
    !isNaN(transferAmount) &&
    transferAmount > 0 &&
    transferAmount <= balance
  ) {
    const confirmation = alert(
      `Transfer $${transferAmount} to ${recipientAccountNumber}?`
    );
    if (confirmation) {
      alert(
        `Transfer of $${transferAmount} to $${recipientAccountNumber} succesful. New balance is $${
          balance - transferAmount
        } `
      );
    } else {
      alert("Insufficient funds! Kindly deposit!");
    }
  }
}

//Balance enquiry feature
function balanceEnquiry() {
  alert(`Available balance: $${balance.toFixed(2)}`);
}
