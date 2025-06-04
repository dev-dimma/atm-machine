document.addEventListener("DOMContentLoaded", function () {
  const savingsBtn = document.getElementById("savings-button");
  const currentBtn = document.getElementById("current-button");
  const errorDiv = document.getElementById("error");
  const backButton = document.getElementById("backButton");

  if (savingsBtn) {
    savingsBtn.addEventListener("click", function () {
      localStorage.setItem("selectedAccount", "Savings");
      window.location.href = "/Deposit/amount.html";
    });
  } else {
    errorDiv.textContent = "Savings button not found.";
  }

  if (currentBtn) {
    currentBtn.addEventListener("click", function () {
      localStorage.setItem("selectedAccount", "Current");
      window.location.href = "/Deposit/amount.html";
    });
  } else {
    errorDiv.textContent = "Current button not found.";
  }

  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "/menu.html";
    });
  }
});
