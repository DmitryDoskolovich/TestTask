const submitForm = document.querySelector(".authorization-form");

const url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";

function getEmail() {
  return document.querySelector(".authorization-form__input_email").value;
}

function getPassword() {
  return document.querySelector(".authorization-form__input_password").value;
}

/*function renderContent(name, photoURL) {
  document.querySelector(
    ".authorization-form"
  ).innerHTML = `<img class="authorization-form__photo authorization-form__photo_position" src=${photoURL}><p class="authorization-form__photo-text authorization-form__photo-text_position">${name}</p><div class="authorization-form__button-container"><input class="authorization-form__button authorization-form__button_logout authorization-form__button_logout_position" type="submit" value="Logout"></input></div>`;
} */

function renderContent(name, photoURL) {
  document.querySelector(".authorization-form").innerHTML = "";
  let temp = document.querySelector(".authorization-form-login-successful-template");
  let clon = temp.content.cloneNode(true);
  clon.querySelector(".authorization-form__photo").src = photoURL;
  clon.querySelector(".authorization-form__photo-text").innerHTML = name;
  document.querySelector(".authorization-form").appendChild(clon);
}

function renderStartContent() {
  document.querySelector(".authorization-form").innerHTML = "";
  let temp = document.querySelector(".default-content-template");
  let clon = temp.content.cloneNode(true);
  document.querySelector(".authorization-form").appendChild(clon);
}

function renderError(value) {
  if (value === true) {
    document.querySelector(".authorization-form__error-message").hidden = false;
    Object.assign(
      document.querySelector(".authorization-form__input_email").style,
      {
        border: "1px solid #ed4159",
        color: "#ed4159"
      }
    );
  } else {
    document.querySelector(".authorization-form__error-message").hidden = true;
  }
}

submitForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let email = getEmail();
  let password = getPassword();
  let credentials = `{ "email": "${email}", "password": "${password}" }`;

  fetch(url, {
    method: "POST",
    body: credentials,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.status !== 200) {
        renderError(true);
      } else {
        res.json().then(response => {
          let responseObj = response;
          renderContent(responseObj["name"], responseObj["photoUrl"]);
          document
            .querySelector(".authorization-form__button_logout")
            .addEventListener("click", function() {
              renderStartContent();
            });
        });
      }
    })
    .catch(error => console.error("Fetch error", error));
});
