let userPin = null;
let balance = 5000;
const transactionHistory = [];

//Pin feature
function setPin(event) {
  event.preventDefault();
  const pinInput = document.getElementById("welcome-page-pin-input");
  const pin = pinInput.value.trim();
  const errorDiv = document.getElementById("error");

  if (pin.length === 4 && Number.isInteger(Number(pin))) {
    userPin = pin;
    pinInput.value = "";
    errorDiv.textContent = "";
    window.location.href = "/menu.html";
    console.log("Pin submitted");
  } else {
    errorDiv.textContent = "Please enter a valid 4-digit PIN.";
  }
}

const pinForm = document.getElementById("pin-form");
pinForm.addEventListener("submit", setPin);

//Deposit

//Pin confirmation feature
// function checkPinAndExecute(actionFunction) {
//   const enteredPin = prompt("Enter your PIN:");
//   if (enteredPin === userPin) {
//     actionFunction();
//   } else {
//     alert("Incorrect PIN. Action Failed!");
//   }
// }

// //Deposit feature
// function deposit() {
//   const amount = prompt("Enter the amount to deposit:");
//   const depositAmount = parseFloat(amount);
//   if (!isNaN(depositAmount) && depositAmount > 0) {
//     balance = balance + depositAmount;
//     transactionHistory.push(`Deposit: $${depositAmount.toFixed(2)}`);
//     alert(
//       `Deposit of $${depositAmount.toFixed(
//         2
//       )} successful. Your new balance is $${balance.toFixed(2)}.`
//     );
//   } else {
//     alert("Invalid deposit amount.");
//   }
// }

// //Withdrawal feature
// function withdraw() {
//   const amount = prompt("Enter the amount to withdraw:");
//   const numericAmount = parseFloat(amount);

//   if (
//     !isNaN(numericAmount) &&
//     numericAmount > 0 &&
//     numericAmount % 10 === 0 &&
//     numericAmount <= balance
//   ) {
//     balance = balance - numericAmount;
//     transactionHistory.push(`Withdrawal: $${numericAmount.toFixed(2)}`);
//     alert(`
//       Withdrawal succesful! Dispensed: $${numericAmount}. New Balance is $${balance}
//     `);
//   } else {
//     alert("Invalid amount or insufficient funds");
//   }
// }

// //Transfer feature
// function transfer() {
//   const recipientAccountNumber = prompt(
//     "Enter the reciepient's account number:"
//   );
//   const transferAmount = parseFloat(prompt("Enter the amount to transfer:"));

//   if (
//     !isNaN(transferAmount) &&
//     transferAmount > 0 &&
//     transferAmount <= balance
//   ) {
//     const confirmation = confirm(
//       `Transfer $${transferAmount} to ${recipientAccountNumber}?`
//     );
//     if (confirmation) {
//       transactionHistory.push(
//         `Transferred $${transferAmount.toFixed(
//           2
//         )} to $${recipientAccountNumber} `
//       );
//       alert(
//         `Transfer of $${transferAmount} to $${recipientAccountNumber} succesful. New balance is $${(balance -=
//           transferAmount)} `
//       );
//     } else {
//       alert("Insufficient funds! Kindly deposit!");
//     }
//   }
// }

// //Balance enquiry feature
// function balanceEnquiry() {
//   alert(`Available balance: $${balance.toFixed(2)}`);
// }

// //PIN change feature
// function changePin() {
//   const oldPin = prompt("Enter old PIN");

//   if (oldPin === userPin) {
//     const newPin = prompt("Enter a new PIN");
//     const confirmedNewPin = prompt("Confirm new PIN");

//     if (
//       confirmedNewPin === newPin &&
//       confirmedNewPin !== oldPin &&
//       confirmedNewPin.length === 4
//     ) {
//       userPin = confirmedNewPin;
//       alert("PIN successfully reset.");
//     } else {
//       alert(
//         "You cannot set your old PIN as the new PIN or enter a valid 4-digit PIN"
//       );
//     }
//   } else {
//     alert("Incorrect old PIN! PIN reset failed!");
//   }
// }

// //Transaction history feature
// function viewHistory() {
//   if (transactionHistory.length === 0) {
//     alert("No transaction history available");
//   } else {
//     alert(`Transaction History:\n${transactionHistory.join("\n")}`);
//   }
// }

// function logout() {
//   userPin = null;
//   balance = 0.0;
//   transactionHistory.length = 0;

//   document.getElementById("atm-features-setup").style.display = "none";
//   document.getElementById("pin-setup").style.display = "block";
// }
