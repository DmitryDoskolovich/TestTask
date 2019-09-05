const submitForm = document.querySelector(".authorization-form");

const url = "https://us-central1-mercdev-academy.cloudfunctions.net/login";

submitForm.addEventListener("submit", function(event) {
  event.preventDefault();
  mainWorkFlow();
});

function mainWorkFlow() {

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
}
