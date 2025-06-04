document.addEventListener("DOMContentLoaded", function () {
  let transaction;
  try {
    transaction = JSON.parse(localStorage.getItem("lastTransaction"));
    if (!transaction || typeof transaction !== "object") {
      throw new Error("No valid transaction data found");
    }

    const requiredProps = ["account", "amount", "balance", "timestamp"];
    if (!requiredProps.every((prop) => prop in transaction)) {
      throw new Error("Missing required transaction properties");
    }

    const accountTypeEl = document.getElementById("account-type");
    const depositAmountEl = document.getElementById("deposit-amount");
    const newBalanceEl = document.getElementById("new-balance");
    const transactionTimeEl = document.getElementById("transaction-time");
    const balanceDisplay = document.getElementById("current-balance");

    if (
      !accountTypeEl ||
      !depositAmountEl ||
      !newBalanceEl ||
      !transactionTimeEl ||
      !balanceDisplay
    ) {
      throw new Error("One or more DOM elements are missing");
    }

    accountTypeEl.textContent = transaction.account;
    depositAmountEl.textContent = `$${parseFloat(transaction.amount).toFixed(
      2
    )}`;
    newBalanceEl.textContent = `$${parseFloat(transaction.balance).toFixed(2)}`;
    transactionTimeEl.textContent = transaction.timestamp;

    if (window.getBalance) {
      const currentBalance = window.getBalance();
      balanceDisplay.textContent = `$${currentBalance.toFixed(2)}`;
    } else {
      console.error("getBalance is not defined");
      balanceDisplay.textContent = "Error: Balance unavailable";
    }

    localStorage.removeItem("lastTransaction");
  } catch (e) {
    console.error("Error processing transaction:", e.message);
    alert(`Error processing transaction: ${e.message}. Please try again.`);
    window.location.href = "/menu.html";
    return;
  }

  try {
    document
      .getElementById("print-receipt")
      ?.addEventListener("click", function () {
        window.print();
      });

    document
      .getElementById("back-to-menu")
      ?.addEventListener("click", function () {
        window.location.href = "/menu.html";
      });
  } catch (e) {
    console.error("Error setting up event listeners:", e.message);
    alert("Error setting up buttons. Please try again.");
  }
});
