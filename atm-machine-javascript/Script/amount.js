document.addEventListener("DOMContentLoaded", function () {
  const depositForm = document.getElementById("deposit-amount-btn-id");
  const amountInput = document.getElementById("deposit-amount-input");
  const errorDiv = document.getElementById("error");
  const backButton = document.getElementById("backButton");

  if (depositForm && amountInput && errorDiv) {
    depositForm.addEventListener("click", function (event) {
      event.preventDefault();

      const selectedAccount = localStorage.getItem("selectedAccount");
      if (
        !selectedAccount ||
        !["Savings", "Current"].includes(selectedAccount)
      ) {
        errorDiv.textContent = "No account selected. Please select an account.";
        errorDiv.classList.add("show");
        setTimeout(() => errorDiv.classList.remove("show"), 3000);
        return;
      }

      const depositAmount = parseFloat(amountInput.value);
      if (isNaN(depositAmount) || depositAmount <= 0) {
        errorDiv.textContent =
          "Please enter a valid deposit amount greater than 0.";
        errorDiv.classList.add("show");
        setTimeout(() => errorDiv.classList.remove("show"), 3000);
        return;
      }

      const MIN_DEPOSIT = 1;
      const MAX_DEPOSIT = 50000;
      if (depositAmount < MIN_DEPOSIT) {
        errorDiv.textContent = `Deposit amount must be at least $${MIN_DEPOSIT}.`;
        errorDiv.classList.add("show");
        setTimeout(() => errorDiv.classList.remove("show"), 3000);
        return;
      }

      if (depositAmount > MAX_DEPOSIT) {
        errorDiv.textContent = `Deposit amount cannot exceed $${MAX_DEPOSIT}.`;
        errorDiv.classList.add("show");
        setTimeout(() => errorDiv.classList.remove("show"), 3000);
        return;
      }

      if (window.getBalance && window.setBalance) {
        const currentBalance = window.getBalance();
        if (isNaN(currentBalance)) {
          errorDiv.textContent = "Error retrieving current balance.";
          errorDiv.classList.add("show");
          setTimeout(() => errorDiv.classList.remove("show"), 3000);
          return;
        }

        const newBalance = currentBalance + depositAmount;
        window.setBalance(newBalance);

        const transactionTime = new Date().toLocaleString();
        const transaction = {
          type: "Deposit",
          account: selectedAccount,
          amount: depositAmount,
          balance: newBalance,
          timestamp: transactionTime,
        };

        if (window.addTransaction) {
          window.addTransaction(
            transaction.type,
            transaction.amount,
            transaction.balance,
            transaction.timestamp,
            transaction.account
          );
        } else {
          console.error("addTransaction is not defined");
          errorDiv.textContent =
            "Error recording transaction. Please try again.";
          errorDiv.classList.add("show");
          setTimeout(() => errorDiv.classList.remove("show"), 3000);
          return;
        }

        localStorage.setItem("lastTransaction", JSON.stringify(transaction));
        window.location.href = "/Deposit/confirm.html";
      } else {
        errorDiv.textContent = "Error processing deposit. Please try again.";
        errorDiv.classList.add("show");
        setTimeout(() => errorDiv.classList.remove("show"), 3000);
      }
    });
  }

  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "/Deposit/account.html";
    });
  }
});
