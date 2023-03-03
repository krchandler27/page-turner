const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="data-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Retrieve the new comment from the server
      const response = await fetch(`/api/comments/${postId}`);
      const { comments } = await response.json();
      const commentsSection = document.querySelector('#comments-section');
  
      // Clear the comments section and append the updated comments
      commentsSection.innerHTML = '';
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