document.addEventListener("DOMContentLoaded", fetchBooks);

// Handle Add Book form submission
document.getElementById("bookForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;

    const newBook = { title, author, genre, year };

    try {
        const response = await fetch("http://localhost:3000/addBook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook),
        });

        if (response.ok) {
            fetchBooks();  // Refresh the book list
            document.getElementById("bookForm").reset();  // Clear the form
        } else {
            console.error("Failed to add book");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Fetch all books from the backend
document.getElementById("viewBooksBtn").addEventListener("click", fetchBooks);

async function fetchBooks() {
    try {
        const response = await fetch("http://localhost:3000/books");
        const books = await response.json();

        const bookList = document.getElementById("bookList");
        bookList.innerHTML = "";

        books.forEach((book) => {
            const li = document.createElement("li");
            li.innerHTML = `${book.title} by ${book.author} 
                            <button class="delete-btn" onclick="deleteBook('${book._id}')">❌</button>`;
            bookList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Handle deleting a book
async function deleteBook(bookId) {
    try {
        const response = await fetch(`http://localhost:3000/deleteBook/${bookId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            fetchBooks();  // Refresh the book list after deletion
        } else {
            console.error("Failed to delete book");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}
