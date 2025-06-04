document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("w-amount-input");
  const proceedButton = document.getElementById("proceed-btn");
  const amountButtons = document.querySelectorAll(
    ".withdrawal-amounts section button"
  );
  const errorDiv = document.getElementById("error");
  const processingMessage = document.getElementById("processing-message");
  const backButton = document.getElementById("backButton");

  function showError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.classList.add("show");
    if (showError.errorTimeout) clearTimeout(showError.errorTimeout);
    showError.errorTimeout = setTimeout(() => {
      errorDiv.classList.remove("show");
      errorDiv.textContent = "";
    }, 3000);
  }

  function getButtonAmount(button) {
    return parseInt(button.textContent.replace(/[^0-9]/g, ""));
  }

  if (amountButtons) {
    amountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = getButtonAmount(button);
        amountInput.value = amount;
      });
    });
  }

  if (proceedButton && amountInput && errorDiv && processingMessage) {
    proceedButton.addEventListener("click", () => {
      errorDiv.textContent = "";
      errorDiv.classList.remove("show");
      processingMessage.textContent = "";
      processingMessage.classList.remove("show");

      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        showError(errorDiv, "Please enter a valid amount greater than 0.");
        return;
      }

      if (amount > 50000) {
        showError(errorDiv, "Maximum withdrawal amount is 50,000.");
        return;
      }

      if (amount < 1) {
        showError(errorDiv, "Minimum withdrawal amount is 1.");
        return;
      }

      if (amount % 1000 !== 0) {
        showError(errorDiv, "Amount must be a multiple of 1000.");
        return;
      }

      const selectedAccount = localStorage.getItem("selectedAccount");
      if (
        !selectedAccount ||
        !["Savings", "Current", "Credit"].includes(selectedAccount)
      ) {
        showError(errorDiv, "No valid account selected.");
        return;
      }

      if (window.getBalance && window.setBalance) {
        const currentBalance = window.getBalance();
        if (isNaN(currentBalance) || currentBalance < 0) {
          showError(errorDiv, "Error retrieving current balance.");
          return;
        }

        if (amount > currentBalance) {
          showError(
            errorDiv,
            `Insufficient funds. Available balance: $${currentBalance.toFixed(
              2
            )}`
          );
          return;
        }

        const newBalance = currentBalance - amount;
        window.setBalance(newBalance);

        const transactionTime = new Date().toLocaleString("en-US", {
          timeZone: "Africa/Lagos",
        });
        const transaction = {
          type: "Withdrawal",
          account: selectedAccount,
          amount: -amount,
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
          showError(errorDiv, "Error recording transaction. Please try again.");
          return;
        }

        localStorage.setItem("lastTransaction", JSON.stringify(transaction));
        processingMessage.textContent = "Processing Withdrawal...";
        processingMessage.classList.add("show");
        proceedButton.disabled = true;

        setTimeout(() => {
          window.location.href = "/Withdraw/w-success.html";
        }, 2000);
      } else {
        showError(errorDiv, "Error processing withdrawal. Please try again.");
      }
    });

    amountInput.addEventListener("input", () => {
      errorDiv.textContent = "";
      errorDiv.classList.remove("show");
    });
  }

  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "/Withdraw/w-account.html";
    });
  }
});
