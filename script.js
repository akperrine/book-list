const bookList = document.querySelector(".book-list");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const inputImportance = document.querySelector("#input-importance");

const submitBtn = document.querySelector("#submit-btn");
const deleteBtns = document.querySelectorAll(".btn");
// Book Class

//UI Class

//Store Class

//Events: Display Book

//Event: Remove a Book

class Book {
  constructor(title, author, importance) {
    this.title = title;
    this.author = author;
    this.importance = importance;
  }
}

// class UI {
//   updateBookList(newBook) {
//     const newRow = document.createElement("tr");
//     newRow.innerHTML = `
//         <td>${newBook.title}</td>
//         <td>${newBook.author}</td>
//         <td>${newBook.importance}</td>
//         `;
//     bookList.appendChild(newRow);
//   }

//   static displayBooks() {
//     const StoredBooks = [
//       {
//         title: "Les-Mis",
//         author: "Hugo",
//         order: 1,
//       },
//       {
//         title: "Crime n Pun",
//         author: "Dost",
//         order: 2,
//       },
//     ];
//     StoredBooks.forEach((book, i) => {
//       UI.updateBookList(book);
//     });
//   }
// }

// class Store {}

///////

displayBooks = function (storedBooks) {
  bookList.innerHTML = ``;

  storedBooks.forEach((book, i) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td class="title">${book.title}</td>
    <td>${book.author}</td>
    <td>${book.importance}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    bookList.appendChild(newRow);
  });
};

getStoredBooks = function () {
  const bookList = JSON.parse(localStorage.getItem("bookList"));
  if (bookList) {
    return bookList;
  } else return [];
};

setStoredBooks = function (bookToSave) {
  const bookList = getStoredBooks();

  localStorage.setItem("bookList", JSON.stringify([...bookList, bookToSave]));
};

deleteStoredBook = function (bookTitle) {
  const bookList = getStoredBooks();
  console.log(bookList);
  console.log(bookTitle);

  bookList.forEach((book, i) => {
    if (book.title === bookTitle) {
      bookList.splice(i, 1);
    }
  });
  localStorage.setItem("bookList", JSON.stringify(bookList));
};

bookSubmit = function () {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const importance = inputImportance.value;
  if (!title || !author || !importance) {
    return;
  }
  const book = new Book(title, author, importance);

  setStoredBooks(book);
  const bookList = getStoredBooks();
  console.log(bookList);
  displayBooks(bookList);
};

deleteBookFromList = function (el) {
  el.parentElement.parentElement.remove();
  console.log(
    el.parentElement.parentElement.querySelector(".title").textContent
  );
  title = el.parentElement.parentElement.querySelector(".title").textContent;
  deleteStoredBook(title);
};

displayBooks(getStoredBooks());

submitBtn.addEventListener("click", bookSubmit);

bookList.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    deleteBookFromList(e.target);
  }
});
