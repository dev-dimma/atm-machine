document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("transactionHistory")) {
    localStorage.setItem("transactionHistory", JSON.stringify([]));
  }

  let transactions =
    JSON.parse(localStorage.getItem("transactionHistory")) || [];

  function saveTransactions() {
    try {
      localStorage.setItem("transactionHistory", JSON.stringify(transactions));
    } catch (e) {
      console.error("Error saving transactions:", e.message);
    }
  }

  function displayTransactions() {
    const transactionList = document.getElementById("transactionList");
    if (!transactionList) {
      console.error("Transaction list element not found");
      return;
    }
    transactionList.innerHTML = "";

    const balanceDisplay = document.getElementById("current-balance");
    if (balanceDisplay && window.getBalance) {
      const currentBalance = window.getBalance();
      balanceDisplay.textContent = `$${currentBalance.toFixed(2)}`;
    } else {
      console.error("Balance display or getBalance not available");
      if (balanceDisplay) {
        balanceDisplay.textContent = "Error: Balance unavailable";
      }
    }

    if (transactions.length === 0) {
      transactionList.innerHTML =
        '<li class="no-transactions">No transactions available</li>';
      return;
    }

    transactions.forEach((transaction) => {
      const li = document.createElement("li");
      li.classList.add("transaction-item");

      const details = document.createElement("div");
      details.classList.add("transaction-details");
      let typeDisplay = `${transaction.type || "Unknown"} (${
        transaction.account || "N/A"
      })`;
      if (transaction.type === "Transfer" && transaction.toAccount) {
        typeDisplay += ` to ${transaction.toAccount}`;
      } else if (transaction.type === "PIN Change") {
        typeDisplay = `${transaction.type} (${transaction.account || "N/A"})`;
      }
      details.innerHTML = `
        <span class="transaction-date">${transaction.timestamp || "N/A"}</span>
        <span class="transaction-type">${typeDisplay}</span>
      `;

      const amount = document.createElement("div");
      amount.classList.add("transaction-amount");
      if ("amount" in transaction) {
        const amountValue = parseFloat(transaction.amount);
        if (isNaN(amountValue)) {
          amount.textContent = "Invalid Amount";
        } else {
          if (amountValue < 0) {
            amount.classList.add("negative");
          }
          amount.textContent = `$${Math.abs(amountValue).toFixed(2)}`;
        }
      } else {
        amount.textContent = "N/A";
      }

      const balance = document.createElement("div");
      balance.classList.add("transaction-balance");
      if ("balance" in transaction) {
        const balanceValue = parseFloat(transaction.balance);
        if (isNaN(balanceValue)) {
          balance.textContent = "Invalid Balance";
        } else {
          balance.textContent = `Balance: $${balanceValue.toFixed(2)}`;
        }
      } else {
        balance.textContent = "N/A";
      }

      li.appendChild(details);
      li.appendChild(amount);
      li.appendChild(balance);
      transactionList.appendChild(li);
    });
  }

  function clearHistory() {
    transactions = [];
    if (window.setBalance) {
      window.setBalance(0);
    }
    saveTransactions();
    displayTransactions();
  }

  window.clearHistory = clearHistory;

  window.addTransaction = function (type, amount, balance, timestamp, account) {
    if (!type || !timestamp || !account) {
      console.error("Missing required transaction fields:", {
        type,
        amount,
        balance,
        timestamp,
        account,
      });
      return;
    }
    const transaction = {
      type,
      timestamp,
      account,
    };
    if (typeof amount !== "undefined" && !isNaN(parseFloat(amount))) {
      transaction.amount = parseFloat(amount);
    }
    if (typeof balance !== "undefined" && !isNaN(parseFloat(balance))) {
      transaction.balance = parseFloat(balance);
    }

    if (arguments.length > 5) {
      for (let i = 5; i < arguments.length; i += 2) {
        if (arguments[i] && arguments[i + 1]) {
          transaction[arguments[i]] = arguments[i + 1];
        }
      }
    }
    transactions.unshift(transaction);
    saveTransactions();
    displayTransactions();
  };

  displayTransactions();

  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "/menu.html";
    });
  }
});
