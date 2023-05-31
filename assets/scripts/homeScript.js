//handling top of the main page with jquery when scrolling
$(window).scroll(function () {
  var sc = $(window).scrollTop();
  if (sc > 100) {
    $(".top").addClass("small");
    $(".library").addClass("small");
  } else {
    $(".top").removeClass("small");
    $(".library").removeClass("small");
  }
});
// getting value of book input

// let file = document.getElementById("formFileMultiple");
// const handleFiles = () => {
//   const selectedFiles = [...file.files];
//   console.log(selectedFiles);
// };
// file.addEventListener("change", handleFiles);

// console.log();

function storeFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:3002/upload", {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("File stored:", result);
      })
      .catch((error) => {
        console.error("Error storing file:", error);
      });
  }
}

//
const libraryChecker = document.getElementsByClassName("books")[0];

//check if there is any books in there
if (!libraryChecker.innerHTML) {
  const notFound = document.createElement("p");
  notFound.classList.add("not-found");
  notFound.innerHTML = "your Library is empty";
  libraryChecker.appendChild(notFound);
}

//reading books from db
(async () => {
  const response = await fetch("http://localhost:3002/books", {
    method: "GET",
  })
    .then((response) => {
      console.log(1);
      return response.json();
    })
    .then((data) => {
      console.log(2);
      libraryChecker.innerHTML = "";
      data.map((item) => {
        const book = document.createElement("div");
        const newBook = `
        <img
          src="${item.image}"
          alt=""
          />
          <div>
          <p class="book-title">Title:</p>
          <p class="book-name">${item.title}</p>
          </div>
          <div>
          <p class="details-title">Details:</p>
          <p class="details">${item.details}</p>
        </div>`;
        book.innerHTML += newBook;
        book.classList.add("book");
        libraryChecker.appendChild(book);

        console.log(item.image);
      });
    })
    .catch((error) => {
      console.log(error);
    });
})();

console.log(1);

//   if (file) {
//     const targetPath = "../books" + file.name;
//     const reader = await new FileReader();

//     reader.onload = function (event) {
//       const fileData = event.target.result;

//       // Display the file data in the fileData element
//       const fileDataElement = document.getElementById("fileData");
//       fileDataElement.textContent = fileData;

//       console.log("File stored at:", targetPath);
//     };

//     reader.readAsDataURL(file);
//   }
// }
