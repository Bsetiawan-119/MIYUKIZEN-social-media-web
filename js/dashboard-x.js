/* ================= INIT ================= */
const postsFeed = document.getElementById("postsFeed");
const postModal = document.getElementById("postModal");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const searchInput = document.getElementById("searchInput");

const sidebarProfilePic = document.getElementById("sidebarProfilePic");
const sidebarUsername = document.getElementById("sidebarUsername");
const sidebarBio = document.getElementById("sidebarBio");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let posts = getData("posts") || [];
let selectedImages = [];

/* ================= TAMBAHAN: GUEST CHECK ================= */
const isGuest = !currentUser;
/* ========================================================= */


/* ================= SIDEBAR ================= */
if (isGuest) {
  sidebarProfilePic.style.display = "none";
  sidebarUsername.style.display = "none";
  sidebarBio.style.display = "none";
} else {
  sidebarProfilePic.src = currentUser.photo || "../asset/LOGOPUTIH.png";
  sidebarUsername.textContent = currentUser.username || currentUser.email;
  sidebarBio.textContent = currentUser.bio || "";
}

/* ================= NAVIGATION ================= */
function goProfile() {
  if (isGuest) {
    alert("Silakan login untuk membuka profil");
    window.location.href = "login.html";
    return;
  }
  window.location.href = "profile.html";
}

/* ================= MODAL POST ================= */
function togglePostModal() {
  if (isGuest) {
    alert("Login diperlukan untuk membuat postingan");
    return;
  }
  postModal.style.display =
    postModal.style.display === "block" ? "none" : "block";
}

/* ================= UPLOAD FOTO (POST BARU) ================= */
postImage.addEventListener("change", () => {
  if (isGuest) return;

  selectedImages = [];
  imagePreviewContainer.innerHTML = "";

  Array.from(postImage.files).forEach(file => {
    const r = new FileReader();
    r.onload = () => {
      selectedImages.push(r.result);
      const img = document.createElement("img");
      img.src = r.result;
      imagePreviewContainer.appendChild(img);
    };
    r.readAsDataURL(file);
  });
});

/* ================= SUBMIT POST ================= */
function submitPost() {
  if (isGuest) {
    alert("Login diperlukan untuk posting");
    return;
  }

  if (!postText.value && selectedImages.length === 0) return;

  posts.unshift({
    id: Date.now(),
    text: postText.value,
    images: [...selectedImages],
    author: currentUser.username || currentUser.email,
    authorId: currentUser.email,
    photo: currentUser.photo || "../asset/LOGOPUTIH.png",
    likes: [],
    comments: [],
    time: new Date().toLocaleString("id-ID")
  });

  setData("posts", posts);

  postText.value = "";
  postImage.value = "";
  selectedImages = [];
  imagePreviewContainer.innerHTML = "";
  togglePostModal();

  renderPosts(posts);
}

/* ================= RENDER POSTS ================= */
function renderPosts(data) {
  postsFeed.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="post-header">
        <img src="${p.photo}" class="post-avatar" onclick="goProfile()">
        <div>
          <strong class="post-author" onclick="goProfile()">${p.author}</strong>
          <div class="post-time">${p.time}</div>
        </div>
      </div>

      <div class="post-menu" onclick="toggleMenu(event, ${p.id})">⋯</div>
      <div class="menu-box" id="menu-${p.id}">
        <button onclick="editPost(${p.id})">Edit</button>
        <button onclick="deletePost(${p.id})">Hapus</button>
      </div>

      <div class="post-content" id="content-${p.id}">
        <p>${p.text || ""}</p>
        ${(p.images || []).map(img => `<img src="${img}">`).join("")}
      </div>

      <div class="post-actions-bar">
        <span onclick="likePost(${p.id})">
          ${p.likes.includes(currentUser?.email) ? "❤️" : "🤍"} ${p.likes.length}
        </span>
        <span onclick="toggleComments(${p.id})">
          💬 ${p.comments.length}
        </span>
      </div>

      <div class="comments" id="comments-${p.id}" style="display:none">
        ${(p.comments || []).map(c => `
          <div class="comment">
            <div class="comment-avatar">
              ${c.author.charAt(0).toUpperCase()}
            </div>

            <div class="comment-bubble">
              <strong>${c.author}</strong><br>${c.text}

              <div class="comment-actions">
                <button onclick="toggleReply(${p.id}, ${c.id})">Balas</button>
                ${
                  !isGuest && c.authorId === currentUser.email
                    ? `<button class="delete"
                        onclick="deleteComment(${p.id}, ${c.id})">Hapus</button>`
                    : ""
                }
              </div>

              ${(c.replies || []).map(r => `
                <div class="reply">
                  <strong>${r.author}</strong>: ${r.text}
                </div>
              `).join("")}

              <input
                class="reply-input"
                id="reply-${p.id}-${c.id}"
                placeholder="Balas komentar..."
                style="display:none"
                onkeydown="submitReply(event, ${p.id}, ${c.id})"
              >
            </div>
          </div>
        `).join("")}

        ${
          isGuest
            ? `<div style="color:#888;font-size:13px">Login untuk berkomentar</div>`
            : `<input
                class="comment-input"
                placeholder="Tulis komentar..."
                onkeydown="addComment(event, ${p.id})"
              >`
        }
      </div>
    `;

    postsFeed.appendChild(div);
  });
}

/* ================= MENU ================= */
function toggleMenu(e, id) {
  if (isGuest) return;

  e.stopPropagation();
  document.querySelectorAll(".menu-box").forEach(m => m.style.display = "none");
  document.getElementById("menu-" + id).style.display = "block";
}
document.body.addEventListener("click", () => {
  document.querySelectorAll(".menu-box").forEach(m => m.style.display = "none");
});

/* ================= DELETE POST ================= */
let deleteTargetId = null;
const deleteModal = document.getElementById("deleteModal");

function deletePost(id) {
  if (isGuest) return;
  deleteTargetId = id;
  deleteModal.style.display = "block";
}
function closeDelete() {
  deleteModal.style.display = "none";
  deleteTargetId = null;
}
function confirmDelete() {
  posts = posts.filter(p => p.id !== deleteTargetId);
  setData("posts", posts);
  closeDelete();
  renderPosts(posts);
}

/* ================= EDIT POST ================= */
function editPost(id) {
  if (isGuest) return;

  const post = posts.find(p => p.id === id);
  const content = document.getElementById("content-" + id);

  content.innerHTML = `
    <div class="edit-card">
      <textarea class="edit-area">${post.text}</textarea>

      <div class="edit-images">
        ${(post.images || []).map((img, i) => `
          <div style="position:relative">
            <img src="${img}">
            <span class="remove-img" onclick="removeEditImage(${id}, ${i})">×</span>
          </div>
        `).join("")}
      </div>

      <input type="file" multiple onchange="addEditImages(event, ${id})">

      <div class="edit-buttons">
        <button class="btn-save-edit" onclick="saveEdit(${id})">Simpan</button>
        <button class="btn-cancel-edit" onclick="renderPosts(posts)">Batal</button>
      </div>
    </div>
  `;
}

function removeEditImage(postId, index) {
  if (isGuest) return;
  const post = posts.find(p => p.id === postId);
  post.images.splice(index, 1);
  editPost(postId);
}

function addEditImages(e, postId) {
  if (isGuest) return;

  const post = posts.find(p => p.id === postId);
  Array.from(e.target.files).forEach(file => {
    const r = new FileReader();
    r.onload = () => {
      post.images.push(r.result);
      editPost(postId);
    };
    r.readAsDataURL(file);
  });
}

function saveEdit(postId) {
  if (isGuest) return;

  const post = posts.find(p => p.id === postId);
  post.text = document.querySelector(".edit-area").value;
  setData("posts", posts);
  renderPosts(posts);
}

/* ================= COMMENTS ================= */
function toggleComments(id) {
  const el = document.getElementById("comments-" + id);
  el.style.display = el.style.display === "none" ? "block" : "none";
}

function addComment(e, id) {
  if (isGuest) return;
  if (e.key !== "Enter") return;

  const text = e.target.value.trim();
  if (!text) return;

  const post = posts.find(p => p.id === id);
  post.comments.push({
    id: Date.now(),
    author: currentUser.username || currentUser.email,
    authorId: currentUser.email,
    text,
    replies: []
  });

  setData("posts", posts);
  renderPosts(posts);
}

function toggleReply(postId, commentId) {
  if (isGuest) return;

  const input = document.getElementById(`reply-${postId}-${commentId}`);
  input.style.display = input.style.display === "none" ? "block" : "none";
  input.focus();
}

function submitReply(e, postId, commentId) {
  if (isGuest) return;
  if (e.key !== "Enter") return;

  const text = e.target.value.trim();
  if (!text) return;

  const post = posts.find(p => p.id === postId);
  const comment = post.comments.find(c => c.id === commentId);

  comment.replies.push({
    author: currentUser.username || currentUser.email,
    text
  });

  setData("posts", posts);
  renderPosts(posts);
}

function deleteComment(postId, commentId) {
  if (isGuest) return;

  const post = posts.find(p => p.id === postId);
  post.comments = post.comments.filter(c => c.id !== commentId);
  setData("posts", posts);
  renderPosts(posts);
}

/* ================= LIKE ================= */
function likePost(id) {
  if (isGuest) {
    alert("Login untuk memberi like");
    return;
  }

  const post = posts.find(p => p.id === id);
  const i = post.likes.indexOf(currentUser.email);
  i === -1 ? post.likes.push(currentUser.email) : post.likes.splice(i, 1);
  setData("posts", posts);
  renderPosts(posts);
}

/* ================= SEARCH ================= */
function searchPosts() {
  const q = searchInput.value.toLowerCase();
  renderPosts(posts.filter(p => p.text.toLowerCase().includes(q)));
}

renderPosts(posts);
