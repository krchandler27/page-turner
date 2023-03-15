// Form for creating new book comment
const commentFormHandler = async function (event) {
  event.preventDefault();

  const book_id = document.querySelector('input[name="book_id"]').value;
  const body = document.getElementById("comment-body").value.trim();

  console.log(book_id);
  console.log(body);

  if (body && book_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ body, book_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/books/" + book_id);
    } else {
      alert("Could not add comment 🚫");
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);