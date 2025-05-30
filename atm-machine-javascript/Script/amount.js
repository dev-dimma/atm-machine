function initializeAccountData() {
  const defaultData = {
    Savings: { balance: 0, history: [] },
    Current: { balance: 0, history: [] },
  };
  if (!localStorage.getItem("accountData")) {
    localStorage.setItem("accountData", JSON.stringify(defaultData));
  }
}

function getAccountData() {
  return JSON.parse(localStorage.getItem("accountData"));
}

function saveAccountData(data) {
  localStorage.setItem("accountData", JSON.stringify(data));
}

function depositAmount(event) {
  event.preventDefault();

  const amountInput = document.getElementById("deposit-amount-input");
  const selectedAccount = localStorage.getItem("selectedAccount");
  const errorDiv = document.getElementById("error");
  // let errorTimeout;

  if (!amountInput || !errorDiv) {
    console.error("Required elements not found");
    return;
  }

  if (!selectedAccount || !["Savings", "Current"].includes(selectedAccount)) {
    showError(errorDiv, "No account selected. Please select an account.");
    return;
  }

  const depositAmount = parseFloat(amountInput.value);

  if (isNaN(depositAmount) || depositAmount <= 0) {
    showError(errorDiv, "Please enter a valid deposit amount greater than 0.");
    return;
  }

  const MIN_DEPOSIT = 1;
  const MAX_DEPOSIT = 50000;

  if (depositAmount < MIN_DEPOSIT) {
    showError(errorDiv, `Deposit amount must be at least $${MIN_DEPOSIT}.`);
    return;
  }

  if (depositAmount > MAX_DEPOSIT) {
    showError(errorDiv, `Deposit amount cannot exceed $${MAX_DEPOSIT}.`);
    return;
  }

  const accountData = getAccountData();
  accountData[selectedAccount].balance += depositAmount;
  const transactionTime = new Date().toLocaleString();
  accountData[selectedAccount].history.push(
    `Deposit: $${depositAmount.toFixed(2)} on ${transactionTime}`
  );

  saveAccountData(accountData);

  localStorage.setItem(
    "lastTransaction",
    JSON.stringify({
      account: selectedAccount,
      amount: depositAmount.toFixed(2),
      newBalance: accountData[selectedAccount].balance.toFixed(2),
      timestamp: transactionTime,
    })
  );

  window.location.href = "/Deposit/confirm.html";
}

function showError(errorDiv, message) {
  errorDiv.textContent = message;
  errorDiv.classList.add("show");

  if (showError.errorTimeout) clearTimeout(showError.errorTimeout);

  showError.errorTimeout = setTimeout(() => {
    errorDiv.classList.remove("show");
  }, 3000);
}

//Event listeners
document.addEventListener("DOMContentLoaded", () => {
  initializeAccountData();

  const depositButton = document.getElementById("deposit-amount-btn-id");
  if (depositButton) {
    depositButton.addEventListener("click", depositAmount);
  } else {
    console.error("Deposit button not found");
  }
});

//Previous page button
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function (event) {
  window.history.back();
});
