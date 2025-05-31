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
