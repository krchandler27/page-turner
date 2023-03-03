const newBookForm = async (event) => {
    event.preventDefault();
  
    const book_name = document.getElementById('book-name').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const genres = document.getElementById('book-genres').value.trim();
    const image = document.getElementById('book-image').value.trim();
    const description = document.getElementById('book-description').value.trim();
    
  
    if (book_name && author && description && genres && image) {
      const response = await fetch(`/api/books`, {
        method: 'POST',
        body: JSON.stringify({ book_name, author, description, genres, image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
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


  const createNewBookClub = async (event) => {
    document.location.replace('/');
  }
  
  document.querySelector('.new-book-form').addEventListener('submit', newBookForm);
  
  document.querySelector('.book-list').addEventListener('click', deleteBookButton);

const imageElement = document.createElement('img');
imageElement.src = Book.image;
