document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("accountBalance")) {
    localStorage.setItem("accountBalance", "0.00");
  }

  const balanceAmount = document.getElementById("balance-amount");
  if (balanceAmount) {
    const currentBalance = parseFloat(localStorage.getItem("accountBalance"));
    if (!isNaN(currentBalance)) {
      balanceAmount.textContent = `$${currentBalance.toFixed(2)}`;
    } else {
      const errorDiv = document.getElementById("error");
      if (errorDiv) {
        errorDiv.textContent = "Error loading balance.";
      }
      console.error(
        "Invalid balance in localStorage:",
        localStorage.getItem("accountBalance")
      );
    }
  }

  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "/menu.html";
    });
  }
});

window.getBalance = () => {
  const balance = parseFloat(localStorage.getItem("accountBalance"));
  return isNaN(balance) ? 0 : balance;
};

window.setBalance = (newBalance) => {
  const parsedBalance = parseFloat(newBalance);
  if (!isNaN(parsedBalance) && parsedBalance >= 0) {
    localStorage.setItem("accountBalance", parsedBalance.toFixed(2));
  } else {
    console.error("Invalid balance value:", newBalance);
  }
};
