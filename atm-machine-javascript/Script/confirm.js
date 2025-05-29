document.addEventListener("DOMContentLoaded", function () {
  const transaction = JSON.parse(localStorage.getItem("lastTransaction"));

  if (transaction) {
    document.getElementById("account-type").textContent = transaction.account;
    document.getElementById(
      "deposit-amount"
    ).textContent = `$${transaction.amount}`;
    document.getElementById(
      "new-balance"
    ).textContent = `$${transaction.newBalance}`;
    document.getElementById("transaction-time").textContent =
      transaction.timestamp;
  } else {
    window.location.href = "/menu.html";
    return;
  }

  document
    .getElementById("print-receipt")
    .addEventListener("click", function () {
      window.print();
    });

  document
    .getElementById("back-to-menu")
    .addEventListener("click", function () {
      window.location.href = "/menu.html";
    });
});
