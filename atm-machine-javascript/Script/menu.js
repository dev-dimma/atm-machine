document.addEventListener("DOMContentLoaded", function () {
  const depositBtn = document.getElementById("deposit");

  if (depositBtn) {
    depositBtn.addEventListener("click", function () {
      window.location.href = "/Deposit/account.html";
    });
  }
});
