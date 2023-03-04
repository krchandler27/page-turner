const deleteBookButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      console.log(id);

      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
      });
  console.log(`/api/books/${id}`);
  console.log(response);

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Could not delete book 🚫');
      }
    }
  };
  
  document.querySelector('.book-list').addEventListener('click', deleteBookButton);

