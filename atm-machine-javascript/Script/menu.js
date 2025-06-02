//Deposit feature
document.addEventListener("DOMContentLoaded", function () {
  const depositBtn = document.getElementById("deposit");

  if (depositBtn) {
    depositBtn.addEventListener("click", function () {
      window.location.href = "/Deposit/account.html";
    });
  }
});

//Withdrawal Feature
document.addEventListener("DOMContentLoaded", function () {
  const withdrawalBtn = document.getElementById("withdrawal");

  if (withdrawalBtn) {
    withdrawalBtn.addEventListener("click", function () {
      window.location.href = "/Withdraw/w-account.html";
    });
  }
});

//Change PIN Feature
document.addEventListener("DOMContentLoaded", function () {
  const changePinBtn = document.getElementById("change-pin-btn");

  if (changePinBtn) {
    changePinBtn.addEventListener("click", function () {
      window.location.href = "/Change pin/change-pin.html";
    });
  }
});

//Cancel Button
document.addEventListener("DOMContentLoaded", function () {
  const cancelBtn = document.getElementById("menu-cancel-btn");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      window.location.href = "/index.html";
    });
  }
});
