document.addEventListener("DOMContentLoaded", () => {
  renderPosts();

  const textarea = document.getElementById("postContent");
  const postBtn = document.getElementById("postBtn");
  const counter = document.querySelector(".char-counter");

  textarea.addEventListener("input", () => {
    const length = textarea.value.length;
    counter.textContent = `${length}/280`;
    postBtn.disabled = length === 0;
  });

  postBtn.addEventListener("click", () => {
    createPost(textarea.value);
    textarea.value = "";
    postBtn.disabled = true;
    counter.textContent = "0/280";
  });
});

function createPost(content) {
  if (!content.trim()) return;

  const posts = getData("posts");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  posts.unshift({
    id: Date.now(),
    userId: user.id,
    username: user.username,
    content,
    createdAt: new Date().toLocaleString()
  });

  setData("posts", posts);
  renderPosts();
}

function deletePost(id) {
  const posts = getData("posts").filter(p => p.id !== id);
  setData("posts", posts);
  renderPosts();
}

function renderPosts() {
  const posts = getData("posts");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const feed = document.getElementById("postsFeed");

  if (!feed) return;

  feed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post-item";

    div.innerHTML = `
      <div class="post-header">
        <strong>@${post.username}</strong>
        <span>${post.createdAt}</span>
      </div>
      <p>${post.content}</p>
      ${
        post.userId === user.id
          ? `<button class="delete-btn" onclick="deletePost(${post.id})">Hapus</button>`
          : ""
      }
    `;

    feed.appendChild(div);
  });
}
