document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const template = document.querySelector('.post-card-template');
  
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
    if (posts.length === 0) {
      postList.innerHTML += '<p class="text-center">No posts yet. Be the first to write one!</p>';
      return;
    }
  
    posts.forEach((post, index) => {
      const clone = template.cloneNode(true);
      clone.classList.remove('d-none', 'post-card-template');
  
      const img = clone.querySelector('.card-img-top');
      const title = clone.querySelector('.card-title');
      const text = clone.querySelector('.card-text');
      const link = clone.querySelector('a');
  
      // Handle image
      if (post.image) {
        img.src = post.image;
        img.alt = post.title;
      } else {
        img.remove(); 
      }
  
      // Fill text content
      title.textContent = post.title;
      text.textContent = post.content.substring(0, 200) + '...';
      link.href = `post.html?id=${index}`;
  
      // Append to post list
      postList.appendChild(clone);
    });
  });
  