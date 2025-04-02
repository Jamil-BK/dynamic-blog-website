document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('post-container');
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
  
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
    if (!postId || isNaN(postId) || !posts[postId]) {
      container.innerHTML = `<p class="text-danger text-center">Post not found.</p>`;
      return;
    }
  
    const post = posts[postId];
  
    let imageHTML = '';
    if (post.image) {
      imageHTML = `<img src="${post.image}" alt="Cover Image">`;
    }
  
    container.innerHTML = `
      ${imageHTML}
      <h2>${post.title}</h2>
      <p>${post.content}</p>
    `;
  
    // DELETE
    document.getElementById('delete-post').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(postId, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post deleted successfully.');
        window.location.href = 'index.html';
      }
    });
  
    // EDIT
    document.getElementById('edit-post').addEventListener('click', () => {
      window.location.href = `new-post.html?id=${postId}`;
    });
  });
  