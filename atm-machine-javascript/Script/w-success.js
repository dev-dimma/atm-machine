document.addEventListener("DOMContentLoaded", () => {
  const accountTypeSpan = document.getElementById("w-account-type");
  const withdrawalAmountSpan = document.getElementById("w-withdrawal-amount");
  const newBalanceSpan = document.getElementById("w-new-balance");
  const transactionTimeSpan = document.getElementById("w-transaction-time");
  const printReceiptButton = document.getElementById("w-print-receipt");
  const backToMenuButton = document.getElementById("w-back-to-menu");

  // Get values from localStorage
  const newBalance = localStorage.getItem("newBalance");
  const accountType = localStorage.getItem("accountType");
  const withdrawalAmount = localStorage.getItem("withdrawalAmount");

  // Display the values
  accountTypeSpan.textContent = accountType || "Unknown";
  withdrawalAmountSpan.textContent = withdrawalAmount
    ? `${withdrawalAmount}`
    : "Unknown";
  newBalanceSpan.textContent = newBalance ? `${newBalance}` : "Unknown";
  transactionTimeSpan.textContent = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  // Print receipt button
  printReceiptButton.addEventListener("click", () => {
    window.print();
  });

  // Back to menu button - clear storage only when leaving
  backToMenuButton.addEventListener("click", () => {
    localStorage.removeItem("accountType");
    localStorage.removeItem("withdrawalAmount");
    localStorage.removeItem("newBalance");
    window.location.href = "/menu.html";
  });
});
