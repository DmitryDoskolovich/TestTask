function getEmail() {
  return document.querySelector(".authorization-form__input_email").value;
}

function getPassword() {
  return document.querySelector(".authorization-form__input_password").value;
}

function renderContent(name, photoURL) {
  document.querySelector(".authorization-form").innerHTML = "";
  let temp = document.querySelector(
    ".authorization-form-login-successful-template"
  );
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
