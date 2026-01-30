// ================= LOGIN =================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = getData("users");

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Email atau password salah");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  });
});

// ================= LOGOUT =================
function handleLogout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ================= PROTEKSI HALAMAN =================

(function checkAuth() {
  const path = window.location.pathname;

  if (path.includes("profile")) {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      alert("Silakan login untuk membuka profil");
      window.location.href = "login.html";
    }
  }
})();
