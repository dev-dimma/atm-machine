//Withdrawal Feature

function withdrawalAccountType() {
  const savingsBtn = document.getElementById("savings-button");
  const currentBtn = document.getElementById("current-button");
  const creditBtn = document.getElementById("credit-button");
  const errorDiv = document.getElementById("error");

  if (savingsBtn) {
    savingsBtn.addEventListener("click", function () {
      localStorage.setItem("selectedAccount", "Savings");
      window.location.href = "/Withdraw/w-amount.html";
    });
  } else {
    errorDiv.textContent = "Savings button not found.";
  }

  if (currentBtn) {
    currentBtn.addEventListener("click", function () {
      localStorage.setItem("selectedAccount", "Current");
      window.location.href = "/Withdraw/w-amount.html";
    });
  } else {
    errorDiv.textContent = "Current button not found.";
  }

  if (creditBtn) {
    creditBtn.addEventListener("click", function () {
      localStorage.setItem("selectedAccount", "Credit");
      window.location.href = "/Withdraw/w-amount.html";
    });
  } else {
    errorDiv.textContent = "Current button not found.";
  }
}

document.addEventListener("DOMContentLoaded", withdrawalAccountType);

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function (event) {
  window.history.back();
});
