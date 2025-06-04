document.addEventListener("DOMContentLoaded", function () {
  const depositBtn = document.getElementById("deposit");

  if (depositBtn) {
    depositBtn.addEventListener("click", function () {
      window.location.href = "/Deposit/account.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const withdrawalBtn = document.getElementById("withdrawal");

  if (withdrawalBtn) {
    withdrawalBtn.addEventListener("click", function () {
      window.location.href = "/Withdraw/w-account.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const changePinBtn = document.getElementById("change-pin-btn");

  if (changePinBtn) {
    changePinBtn.addEventListener("click", function () {
      window.location.href = "/Change pin/change-pin.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const checkBalance = document.getElementById("check-balance");

  if (checkBalance) {
    checkBalance.addEventListener("click", function () {
      window.location.href = "/Check balance/check-balance.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const transferBtn = document.getElementById("transfer");

  if (transferBtn) {
    transferBtn.addEventListener("click", function () {
      window.location.href = "/Transfer/transfer.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const historyBtn = document.getElementById("history");

  if (historyBtn) {
    historyBtn.addEventListener("click", function () {
      window.location.href = "/Transaction history/t-history.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cancelBtn = document.getElementById("menu-cancel-btn");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      window.location.href = "/index.html";
    });
  }
});
