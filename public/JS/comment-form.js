const commentFormHandler = async (event) => {
  event.preventDefault();

  const bookId = document.querySelector('[data-book-id]').getAttribute('data-book-id');
  const comment = document.querySelector('#comment').value.trim();

  if (comment && bookId) {
    const response = await fetch(`/books/${bookId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);