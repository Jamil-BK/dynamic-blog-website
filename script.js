document.addEventListener('DOMContentLoaded', () => {
  const latestContainer = document.getElementById('latest-post');
  const postList = document.getElementById('post-list');
  const template = document.querySelector('.post-card-template');

  // Seed posts if there is no post exist
  if (!localStorage.getItem('posts')) {
    const samplePosts = [
      {
        title: "Pather Panchali – A Timeless Journey Through Rural Bengal",
        content: "Pather Panchali by Bibhutibhushan Bandyopadhyay is more than just a novel; it is a literary window into the soul of rural Bengal during the early 20th century. Through the eyes of the young protagonist Apu...",
        image: "images/pather-panchali.jpg"
      },
      {
        title: "Gitanjali – The Song Offerings of Tagore",
        content: "Gitanjali by Rabindranath Tagore is a soul-stirring collection of poems that earned him the Nobel Prize in Literature. It presents devotional verses filled with spiritual longing, divine love, and introspection...",
        image: "images/gitanjali.jpg"
      },
      {
        title: "Bandhan Hara – Kazi Nazrul Islam’s Revolutionary Novel",
        content: "Bandhan Hara by Kazi Nazrul Islam explores the theme of freedom—freedom from oppression, tradition, and societal norms. Written during colonial unrest, the novel reflects Nazrul’s fiery passion for justice...",
        image: "images/bandhan-hara.jpg"
      },
      {
        title: "Himu – Humayun Ahmed’s Most Iconic Character",
        content: "Humayun Ahmed’s Himu series introduced one of the most intriguing characters in Bengali fiction—Himu, a barefoot philosopher in a yellow panjabi who wanders the streets of Dhaka, spreading wisdom, humor, and unpredictability...",
        image: "images/himu.jpg"
      }
    ];
    localStorage.setItem('posts', JSON.stringify(samplePosts));
  }

  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  if (posts.length === 0) {
    postList.innerHTML += '<p class="text-center">No posts yet. Be the first to write one!</p>';
    return;
  }

  // Function to create post card
  const createCard = (post, index) => {
    const clone = template.cloneNode(true);
    clone.classList.remove('d-none', 'post-card-template');

    const img = clone.querySelector('.card-img-top');
    const title = clone.querySelector('.card-title');
    const shortText = clone.querySelector('.short-content');
    const fullText = clone.querySelector('.full-content');
    const readMoreBtn = clone.querySelector('.read-more-btn');
    const editBtn = clone.querySelector('.edit-btn');

    // Fill content
    if (post.image) {
      img.src = post.image;
      img.alt = post.title;
    } else {
      img.remove();
    }

    title.textContent = post.title;
    shortText.textContent = post.content.substring(0, 200) + '...';
    fullText.textContent = post.content;

    // Read More ----toggle
    readMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = fullText.classList.contains('d-none') === false;

      // Collapse all open posts
      document.querySelectorAll('.full-content').forEach(fc => fc.classList.add('d-none'));
      document.querySelectorAll('.short-content').forEach(sc => sc.classList.remove('d-none'));
      document.querySelectorAll('.read-more-btn').forEach(btn => btn.textContent = 'Read More');

      if (!isExpanded) {
        shortText.classList.add('d-none');
        fullText.classList.remove('d-none');
        readMoreBtn.textContent = 'Show Less';
      }
    });

    // Edit button link
    editBtn.addEventListener('click', () => {
      window.location.href = `post.html?id=${index}`;
    });

    return clone;
  };

  // Latest post
  const latest = createCard(posts[posts.length - 1], posts.length - 1);
  latest.classList.add('latest-highlight');
  latestContainer.appendChild(latest);

  // All older posts
  posts.slice(0, posts.length - 1).forEach((post, index) => {
    const card = createCard(post, index);
    postList.appendChild(card);
  });

  // Collapse open posts if clicks outside Read More
  document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.read-more-btn')) {
      document.querySelectorAll('.full-content').forEach(fc => fc.classList.add('d-none'));
      document.querySelectorAll('.short-content').forEach(sc => sc.classList.remove('d-none'));
      document.querySelectorAll('.read-more-btn').forEach(btn => btn.textContent = 'Read More');
    }
  });
});
