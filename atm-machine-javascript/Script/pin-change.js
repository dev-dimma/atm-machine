let errorTimeout;

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("backButton");
  const changePinBtn = document.getElementById("change-pin-btn");
  backButton.addEventListener("click", function () {
    window.location.href = "/menu.html";
  });

  changePinBtn.addEventListener("click", changePin);
});

function changePin() {
  const currentPinInput = document.getElementById("current-pin");
  const newPinInput = document.getElementById("new-pin");
  const confirmPinInput = document.getElementById("confirm-pin");
  const errorDiv = document.getElementById("error");

  const currentPin = currentPinInput.value.trim();
  const newPin = newPinInput.value.trim();
  const confirmPin = confirmPinInput.value.trim();

  errorDiv.textContent = "";
  errorDiv.classList.remove("show");

  if (!currentPin || !newPin || !confirmPin) {
    showError("All fields are required");
    return;
  }

  const storedPin = localStorage.getItem("userPin");
  if (currentPin !== storedPin) {
    showError("Current PIN is incorrect");
    return;
  }

  if (newPin.length !== 4 || !Number.isInteger(Number(newPin))) {
    showError("New PIN must be a 4-digit number");
    return;
  }

  if (newPin !== confirmPin) {
    showError("New PIN and confirmation do not match");
    return;
  }

  if (newPin === currentPin) {
    showError("New PIN must be different from current PIN");
    return;
  }

  localStorage.setItem("userPin", newPin);

  currentPinInput.value = "";
  newPinInput.value = "";
  confirmPinInput.value = "";

  showError("PIN changed successfully!", "success");

  setTimeout(() => {
    window.location.href = "/menu.html";
  }, 3000);
}

function showError(message, type = "error") {
  const errorDiv = document.getElementById("error");

  errorDiv.textContent = message;
  errorDiv.className = "pin-error-message";

  if (type === "error") {
    errorDiv.classList.add("show");
  } else if (type === "success") {
    errorDiv.classList.add("show", "success");
  }

  if (errorTimeout) clearTimeout(errorTimeout);

  errorTimeout = setTimeout(() => {
    errorDiv.classList.remove("show", "success");
  }, 3000);
}
