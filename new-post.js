document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const imageInput = document.getElementById('image');
  
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
    // If editing, load existing post 
    if (postId !== null && posts[postId]) {
      const post = posts[postId];
      titleInput.value = post.title;
      contentInput.value = post.content;
      imageInput.dataset.existingImage = post.image || '';
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      let image = imageInput.dataset.existingImage || '';
  
      if (!title || !content) {
        alert('Please fill in both title and content.');
        return;
      }
  
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          image = e.target.result;
          savePost(title, content, image);
        };
        reader.readAsDataURL(file);
      } else {
        savePost(title, content, image);
      }
    });
  
    function savePost(title, content, image) {
      const newPost = { title, content, image };
  
      if (postId !== null && posts[postId]) {
        posts[postId] = newPost; // Update  post
      } else {
        posts.push(newPost); // Create new post
      }
  
      localStorage.setItem('posts', JSON.stringify(posts));
      window.location.href = 'index.html';
    }
  });
  