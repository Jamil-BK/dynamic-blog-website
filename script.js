document.addEventListener('DOMContentLoaded', () => {
  const latestContainer = document.getElementById('latest-post');
  const postList = document.getElementById('post-list');
  const template = document.querySelector('.post-card-template');

  // Seed posts if none exist
  if (!localStorage.getItem('posts')) {
    const samplePosts = [
      {
        title: "Pather Panchali – A Timeless Journey Through Rural Bengal",
        content: "Pather Panchali by Bibhutibhushan Bandyopadhyay is more than just a novel; it is a literary window into the soul of rural Bengal during the early 20th century. Through the eyes of the young protagonist Apu, the story unfolds with quiet depth, immersing the reader into the fragile, often harsh reality of a poor Brahmin family living in the village of Nischindipur. The narrative follows their struggles with poverty, sorrow, and hope—especially Apu’s bond with his sister Durga. Their love for nature, small joys like riding a train, and silent endurance offer readers a glimpse into a fading yet powerful world. This book’s poetic simplicity, emotional subtlety, and strong characters make it a cornerstone of Bengali literature.",
        image: "images/pather-panchali.jpg"
      },
      {
        title: "Gitanjali – The Song Offerings of Tagore",
        content: "Gitanjali by Rabindranath Tagore is a soul-stirring collection of poems that earned him the Nobel Prize in Literature. Originally written in Bengali and later translated into English by the author himself, the book presents devotional verses filled with spiritual longing, divine love, and deep introspection. Each poem feels like a quiet prayer—a conversation between the poet and the eternal spirit. With themes of nature, God, death, and humility, Tagore explores the essence of life with profound beauty and simplicity. Even after more than a century, Gitanjali continues to inspire readers across the world with its lyrical depth and universal truth.",
        image: "images/gitanjali.jpg"
      },
      {
        title: "Bandhan Hara – Kazi Nazrul Islam’s Revolutionary Novel",
        content: "Bandhan Hara by Kazi Nazrul Islam, our national poet, is a powerful novel exploring the theme of freedom—freedom from oppression, tradition, and societal norms. Written during a time of colonial unrest, the novel reflects Nazrul’s fiery passion for justice and rebellion. Through emotionally charged characters and poetic prose, he portrays the struggles of individuals yearning to break free from spiritual and physical chains. The novel weaves together love, sacrifice, and revolution, making it both timeless and deeply rooted in its historical context. Bandhan Hara remains a rare gem that showcases Nazrul's versatility as both poet and novelist",
        image: "images/bandhan-hara.jpg"
      },
      {
        title: "Himu – Humayun Ahmed’s Most Iconic Character",
        content: "Humayun Ahmed’s Himu series introduced one of the most intriguing characters in Bengali fiction—Himu, a barefoot philosopher in a yellow panjabi who wanders the streets of Dhaka, spreading wisdom, humor, and unpredictability. In a society obsessed with logic and stability, Himu challenges norms and embraces uncertainty. He does not seek wealth, career, or even comfort. Yet his observations on life, love, and human nature are profound and often unsettling. The Himu books are filled with subtle social commentary, wit, and absurdity that only Humayun Ahmed could master. Himu teaches us that sometimes the most illogical life is the most meaningful one.",
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

    // Read More toggle
    readMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = !fullText.classList.contains('d-none');

      // Collapse all posts first
      document.querySelectorAll('.full-content').forEach(fc => fc.classList.add('d-none'));
      document.querySelectorAll('.short-content').forEach(sc => sc.classList.remove('d-none'));
      document.querySelectorAll('.read-more-btn').forEach(btn => btn.textContent = 'Read More');

      if (!isExpanded) {
        shortText.classList.add('d-none');
        fullText.classList.remove('d-none');
        readMoreBtn.textContent = 'Show Less';
      }
    });

    // Edit button
    editBtn.addEventListener('click', () => {
      window.location.href = `post.html?id=${index}`;
    });

    return clone;
  };

  // Latest post
  const latest = createCard(posts[posts.length - 1], posts.length - 1);
  latest.classList.add('latest-highlight');
  latestContainer.appendChild(latest);

  // Other posts
  posts.slice(0, posts.length - 1).forEach((post, index) => {
    const card = createCard(post, index);
    postList.appendChild(card);
  });

  // Collapse if clicking outside card
  document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.card')) {
      document.querySelectorAll('.full-content').forEach(fc => fc.classList.add('d-none'));
      document.querySelectorAll('.short-content').forEach(sc => sc.classList.remove('d-none'));
      document.querySelectorAll('.read-more-btn').forEach(btn => btn.textContent = 'Read More');
    }
  });
});
