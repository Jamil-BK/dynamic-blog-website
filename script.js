document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    
    // Get posts from localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
    if (posts.length === 0) {
      postList.innerHTML = '<p class="text-center">No posts yet. Be the first to write one!</p>';
      return;
    }
  
    posts.forEach((post, index) => {
      const postCard = `
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.content.substring(0, 100)}...</p>
              <a href="post.html?id=${index}" class="btn btn-outline-primary btn-sm">Read More</a>
            </div>
          </div>
        </div>
      `;
      postList.innerHTML += postCard;
    });
  });
  