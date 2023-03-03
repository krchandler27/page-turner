const newBookForm = async (event) => {
    event.preventDefault();
  
    const book_name = document.getElementById('book-name').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const genres = document.getElementById('book-genres').value.trim();
    const image = document.getElementById('book-image').value.trim();
    const description = document.getElementById('book-description').value.trim();
    
  
    if (book_name && author && description && genres && image) {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify({ book_name, author, description, genres, image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Could not create book 🚫');
      }
    }
  };

  document.querySelector('.new-book-form').addEventListener('submit', newBookForm);