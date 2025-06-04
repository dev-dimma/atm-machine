document.addEventListener("DOMContentLoaded", function () {
  const fromAccount = document.getElementById("fromAccount");
  const toAccount = document.getElementById("toAccount");
  const transferAmount = document.getElementById("transferAmount");
  const cancelBtn = document.getElementById("cancelTransfer");
  const confirmBtn = document.getElementById("confirmTransfer");
  const messageDiv = document.getElementById("transferMessage");
  const backButton = document.getElementById("backButton");

  function resetMessage() {
    messageDiv.textContent = "";
    messageDiv.className = "";
    messageDiv.style.display = "none";
  }

  function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `transfer-message ${type}`;
    messageDiv.style.display = "block";
    messageDiv.style.padding = "10px";
    messageDiv.style.marginTop = "10px";
    messageDiv.style.borderRadius = "5px";
    messageDiv.style.backgroundColor = type === "error" ? "#f44336" : "#0b7dda";
    messageDiv.style.color = "#fff";
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "/menu.html";
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      resetMessage();
      toAccount.value = "";
      transferAmount.value = "";
      fromAccount.value = "";
      window.location.href = "/menu.html";
    });
  }

  if (confirmBtn && fromAccount && toAccount && transferAmount && messageDiv) {
    confirmBtn.addEventListener("click", function () {
      resetMessage();

      const from = fromAccount.value;
      const to = toAccount.value.trim();
      const amount = parseFloat(transferAmount.value);

      if (!from || !["Savings", "Current", "Credit"].includes(from)) {
        showMessage("Please select a valid From account", "error");
        return;
      }

      if (!to || to.length < 4) {
        showMessage("Account number must be at least 4 digits", "error");
        return;
      }

      if (isNaN(amount) || !isFinite(amount) || amount <= 0) {
        showMessage("Please enter a valid amount greater than 0", "error");
        return;
      }

      if (amount > 50000) {
        showMessage("Maximum transfer amount is 50,000", "error");
        return;
      }

      if (window.getBalance && window.setBalance) {
        const currentBalance = window.getBalance();
        if (isNaN(currentBalance)) {
          showMessage("Error retrieving current balance", "error");
          return;
        }

        if (amount > currentBalance) {
          showMessage("Insufficient funds", "error");
          return;
        }

        const newBalance = currentBalance - amount;
        window.setBalance(newBalance);

        const transactionTime = new Date().toLocaleString("en-US", {
          timeZone: "Africa/Lagos",
        });
        const transaction = {
          type: "Transfer",
          account: from,
          amount: -amount,
          balance: newBalance,
          timestamp: transactionTime,
          toAccount: to,
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
          showMessage(
            "Error recording transaction. Please try again.",
            "error"
          );
          return;
        }

        localStorage.setItem("lastTransaction", JSON.stringify(transaction));

        showMessage(
          `$${amount.toFixed(
            2
          )} transferred successfully to account ${to}! New balance: $${newBalance.toFixed(
            2
          )}`,
          "success"
        );

        setTimeout(() => {
          toAccount.value = "";
          transferAmount.value = "";
          fromAccount.value = "";
          resetMessage();
          window.location.href = "/menu.html";
        }, 3000);
      } else {
        showMessage("Error processing transfer. Please try again.", "error");
      }
    });
  }
});
