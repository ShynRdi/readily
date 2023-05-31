//skipping the login page
// function formLoginSubmission(e) {
//   e.preventDefault();
//   location.href = "../../../Readily/assets/pages/home.html";
// }

//login handling
const userName = document.getElementById("userName");
const userPass = document.getElementById("password");
const formLoginSubmission = async (e) => {
  e.preventDefault();
  if (!userName || !userPass) {
    console.log("your have to fill all of the boxes");
    document.getElementById("wrongText").style = "display:block";
  } else {
    document.getElementById("wrongText").style = "display:none";
    const response = await fetch("http://localhost:3002/users", {
      method: "GET",
    })
      .then((response) => {
        console.log("mozeDaryaii");
        return response.json();
      })
      .then((data) => {
        data.map((item) => {
          console.log(2, item.username, userName.value);
          if (item.username == userName.value) {
            console.log("asd");
            if (userPass.value == item.password) {
              location.href = "../../../Readily/assets/pages/home.html";
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//sign up handeling
const userRealName = document.getElementById("userRealName");
const formSignupSubmission = async (e) => {
  e.preventDefault();

  if (userName.value && userPass.value && userRealName.value) {
    console.log("asd");

    const response = await fetch("http://localhost:3002/users", {
      method: "POST",
      body: JSON.stringify({
        name: userRealName.value,
        username: userName.value,
        password: userPass.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((json) => {
        return json.json();
      })
      .catch((error) => {
        console.log(error);
      });
    location.href = "../../../Readily/assets/pages/home.html";
  } else {
    console.log("your user name or password is wrong");
    document.getElementById("wrongText").style = "display:block";
  }
};
