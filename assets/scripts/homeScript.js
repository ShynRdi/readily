function getURL(path) {
  // Check if the app is running on GitHub Pages or locally
  if (window.location.hostname === "shynrdi.github.io") {
    const baseURL = "/readily-pure";
    return baseURL + path;
  } else {
    return path;
  }
}
//
function signedInChecker() {
  if (!localStorage.getItem("userName")) {
    // location.href = "../../index.html";
    location.replace(getURL("/index.html"));
  }
}
//handling top of the main page with jquery when scrolling
$(window).scroll(function () {
  var sc = $(window).scrollTop();
  if (sc > 40) {
    $(".top").addClass("small");
    $(".library").addClass("small");
  } else {
    $(".top").removeClass("small");
    $(".library").removeClass("small");
  }
});
const userName = localStorage.getItem("userName");
const libraryChecker = document.getElementsByClassName("books")[0];

//reading books from db
(async () => {
  libraryChecker.innerHTML = `<div class='loading'>
  <div class='inner-loading-first'></div>
  <div class='inner-loading-second'></div>
  <div class='inner-loading-third'></div>
  </div>`;
  const response = await fetch(
    "https://6347ecf70484786c6e8cea40.mockapi.io/books",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const userData = data.filter((item) => item.persons == userName);
      if (userData.length) {
        libraryChecker.innerHTML = "";
      } else {
        libraryChecker.querySelector(".loading").remove();
        const notFound = document.createElement("p");
        notFound.classList.add("not-found");
        notFound.innerHTML = "your Library is empty";
        libraryChecker.appendChild(notFound);
      }

      userData.map((item) => {
        const book = document.createElement("div");
        const newBook = `
        <img 
          src="../img/icons8-delete-24.png"
          alt="${item.id}"
          class="edit-button"
          onclick="editPandel(event)"
          />
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
      });
    })
    .catch((error) => {
      console.log(error);
    });
})();

//handling add books
async function handelSubmit(e) {
  e.preventDefault();
  const bookImage = document.getElementById("bookImage");
  const bookTitle = document.getElementById("bookName");
  const bookDetail = document.getElementById("bookDetails");
  if (bookDetail.value && bookImage.value && bookTitle.value) {
    await axios.post("https://6347ecf70484786c6e8cea40.mockapi.io/books", {
      image: `${bookImage.value}`,
      title: `${bookTitle.value}`,
      details: `${bookDetail.value}`,
      persons: `${userName}`,
    });
    window.location.reload();
  } else {
    document.getElementById("inputWarning").style = "display:block;";
  }
}

//handling logout book
function logOut() {
  localStorage.clear();
  location.replace(getURL("/index.html"));
}

function editPandel(e) {
  const getId = e.target.parentElement.getElementsByTagName("img")[0].alt;
  (async () => {
    await fetch(`https://6347ecf70484786c6e8cea40.mockapi.io/books/${getId}`, {
      method: "DELETE",
    });

    window.location.reload();
  })();
}
