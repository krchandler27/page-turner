const commentFormHandler = async function(event) {
    event.preventDefault();
  
    // const comment_id = document.querySelector('input[name="data-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ body }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Retrieve the new comment from the server
      // const response = await fetch(`/api/comments/${id}`);
      const { comments } = await response.json();
      const commentsSection = document.querySelector('#comments-section');
  
      // Clear the comments section and append the updated comments
      // commentsSection.innerHTML = '';
      comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.innerHTML = `
          <p>${comment.body}</p>
          <p>&mdash; ${comment.User.username}, ${format_date(comment.createdAt)}</p>
        `;
        commentsSection.appendChild(commentEl);
      });
  
      // Clear the comment form
      document.querySelector('textarea[name="comment-body"]').value = '';
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);