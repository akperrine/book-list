const bookList = document.querySelector(".book-list");
const inputTitle = document.querySelector("#input-title");
const inputAuthor = document.querySelector("#input-author");
const inputImportance = document.querySelector("#input-importance");

const submitBtn = document.querySelector("#submit-btn");
const deleteBtns = document.querySelectorAll(".delete");

displayBooks = function (storedBooks) {
  bookList.innerHTML = ``;

  storedBooks.forEach((book, i) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.importance}</td>
    <td class="delete"><button class="btn btn-danger btn-sm delete rounded-circle" id="delete-btn"></button></td>
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

displayBooks(getStoredBooks());

submitBtn.addEventListener("click", bookSubmit);

deleteBtns.forEach((btn) => {
  return btn.addEventListener("click", function () {
    console.log("works");
  });
});
