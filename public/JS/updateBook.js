// Update existing book
const updateBookOutline = async (event) => {
    event.preventDefault();
  
    const book_id = document.getElementById("book-id").value;
    const book_name = document.getElementById("book-name").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const description = document.getElementById("book-description").value.trim();
    const genres = document.getElementById("book-genres").value.trim();
    const image = document.getElementById("book-image").value.trim();
  
    if (book_name && author && description && genres) {
      try {
        const bookInfo = await fetch(`/api/books/${book_id}`, {
          method: "PUT",
          body: JSON.stringify({ book_name: book_name, author: author, description: description, genres: genres, image: image }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (bookInfo.ok) {
          // alert("book Updated 👍");
          document.location.replace("/profile");
        } else {
          alert("🚫 Could not update book 🚫");
        }
      } catch (err) {
        console.log("🐠🐠🐠🐠", err);
      }
    }
  };
  
  document
    .getElementById("update-book-outline")
    .addEventListener("submit", updateBookOutline);
  