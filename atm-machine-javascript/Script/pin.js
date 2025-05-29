let userPin = null;

//Pin feature
function setPin(event) {
  event.preventDefault();
  const pinInput = document.getElementById("pin-input-id");
  const pin = pinInput.value.trim();
  const errorDiv = document.getElementById("error");
  let errorTimeout;

  if (pin === "") {
    errorDiv.textContent = "Enter a 4-digit pin";
    errorDiv.classList.add("show");

    if (errorTimeout) clearTimeout(errorTimeout);

    errorTimeout = setTimeout(() => {
      errorDiv.classList.remove("show");
    }, 3000);
    return;
  }

  if (pin.length !== 4 || !Number.isInteger(Number(pin))) {
    errorDiv.textContent = "Please enter a valid 4-digit PIN.";
    errorDiv.classList.add("show");

    if (errorTimeout) clearTimeout(errorTimeout);

    errorTimeout = setTimeout(() => {
      errorDiv.classList.remove("show");
    }, 3000);
    return;
  } else {
    userPin = pin;
    localStorage.setItem("userPin", pin);
    pinInput.value = "";
    errorDiv.textContent = "";
    window.location.href = "/menu.html";
  }
}

const pinForm = document.getElementById("pin-form");
pinForm.addEventListener("submit", setPin);
