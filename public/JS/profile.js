const newBookForm = async (event) => {
    event.preventDefault();
  
    const bookName = document.getElementById('bookName').value.trim();
    const author = document.getElementById('author').value.trim();
    const description = document.getElementById('description').value.trim();
    const genres = document.getElementById('genres').value.trim();
    const image = document.getElementById('image').value.trim();
  
    if (bookName && author && description && genres && image) {
      const response = await fetch(`/api/books`, {
        method: 'POST',
        body: JSON.stringify({ bookName, author, description, genres, image }),
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
  
  const deleteBookButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Could not delete book 🚫');
      }
    }
  };
  
  document.querySelector('.new-book-form').addEventListener('submit', newBookForm);
  
  document.querySelector('.book-list').addEventListener('click', deleteBookButton);
