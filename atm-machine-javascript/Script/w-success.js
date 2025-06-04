document.addEventListener("DOMContentLoaded", function () {
  const accountTypeSpan = document.getElementById("w-account-type");
  const withdrawalAmountSpan = document.getElementById("w-withdrawal-amount");
  const newBalanceSpan = document.getElementById("w-new-balance");
  const transactionTimeSpan = document.getElementById("w-transaction-time");
  const printReceiptButton = document.getElementById("w-print-receipt");
  const backToMenuButton = document.getElementById("w-back-to-menu");

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

    accountTypeSpan.textContent = transaction.account;
    withdrawalAmountSpan.textContent = `$${Math.abs(
      parseFloat(transaction.amount)
    ).toFixed(2)}`;
    newBalanceSpan.textContent = `$${parseFloat(transaction.balance).toFixed(
      2
    )}`;
    transactionTimeSpan.textContent = transaction.timestamp;

    localStorage.removeItem("lastTransaction");
  } catch (e) {
    console.error("Error processing transaction:", e.message);
    alert(`Error processing transaction: ${e.message}. Please try again.`);
    window.location.href = "/menu.html";
    return;
  }

  if (printReceiptButton) {
    printReceiptButton.addEventListener("click", () => {
      window.print();
    });
  }

  if (backToMenuButton) {
    backToMenuButton.addEventListener("click", () => {
      window.location.href = "/menu.html";
    });
  }
});
