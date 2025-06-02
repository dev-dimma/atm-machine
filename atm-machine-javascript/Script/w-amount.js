// Get DOM elements
const amountInput = document.getElementById("w-amount-input");
const proceedButton = document.getElementById("proceed-btn");
const amountButtons = document.querySelectorAll(
  ".withdrawal-amounts section button"
);
const errorDiv = document.getElementById("error");
const processingMessage = document.getElementById("processing-message");

function getButtonAmount(button) {
  return parseInt(button.textContent.replace(/[^0-9]/g, ""));
}

amountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const amount = getButtonAmount(button);
    amountInput.value = amount; //
  });
});

proceedButton.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);

  errorDiv.textContent = "";
  errorDiv.classList.remove("show");
  processingMessage.textContent = "";

  if (!amount || amount <= 0) {
    showError(errorDiv, "Please enter a valid amount.");
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

  const currentBalance =
    parseInt(localStorage.getItem("currentBalance")) || 100000;
  const newBalance = currentBalance - amount;
  const accountType = localStorage.getItem("selectedAccount") || "Savings";

  try {
    localStorage.setItem("withdrawalAmount", amount);
    localStorage.setItem("accountType", accountType);
    localStorage.setItem("newBalance", newBalance);
    localStorage.setItem("currentBalance", newBalance); // Update for future transactions
  } catch (error) {
    console.error("LocalStorage error:", error);

    window.location.href = `w-success.html?amount=${amount}&balance=${newBalance}`;
    return;
  }

  processingMessage.textContent = "Processing Withdrawal...";
  processingMessage.style.display = "block";
  proceedButton.disabled = true;

  setTimeout(() => {
    window.location.href = "/Withdraw/w-success.html";
  }, 2000);

  function showError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";

    if (showError.errorTimeout) clearTimeout(showError.errorTimeout);

    showError.errorTimeout = setTimeout(() => {
      errorDiv.style.display = "none";
    }, 3000);
  }
});

//Previous page button
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function (event) {
  window.history.back();
});
