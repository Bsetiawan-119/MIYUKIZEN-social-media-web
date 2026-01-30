// ================= AUTH GUARD =================
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
  alert("Silakan login untuk membuka profil");
  window.location.href = "login.html";
}

// ================= ELEMENT =================
const profileImage = document.getElementById("profileImage");
const profilePicInput = document.getElementById("profilePicInput");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

// ================= LOAD DATA =================
profileImage.src = user.photo || "../asset/LOGOPUTIH.png";
username.value = user.username || "";
bio.value = user.bio || "";

// ================= UPLOAD FOTO (BASE64) =================
profilePicInput.addEventListener("change", () => {
  const file = profilePicInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    user.photo = reader.result;
    profileImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// ================= ACTIONS =================
function cancelProfile() {
  window.location.href = "dashboard.html";
}

function saveProfile() {
  user.username = username.value.trim();
  user.bio = bio.value.trim();

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}
