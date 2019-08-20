const submitForm = document.querySelector("#authorizationFormId");

const defaultContent = '<form class="authorization-form" id="authorizationFormId"><h3>Log In</h3><input class="input-element" id="emailId" name="email" type="email" placeholder="E-Mail"><input class="input-element" id="passwordId" name="password" type="password" placeholder="Password"><input class="input-element input-error" id="errorMsg" type="text" placeholder="E-Mail or password is incorrect" readonly></input><div id="btnDiv"><input class="loginBtn" id="inputLoginId" type="submit" name="submit" value="Login"></div></form>';

const url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';

function getEmail() {
    return document.querySelector("#emailId").value;
}

function getPassword() {
    return document.querySelector("#passwordId").value;
}

function renderContent(name, photoURL) {
    document.querySelector("#authorizationFormId").innerHTML = `<img class="photo" src=${photoURL}><p>${name}</p><div id="btnDiv"><input class="loginBtn" id="inputLogoutId" type="submit" value="Logout"></input></div>`;
}

function renderStartContent(content) {
    document.querySelector("#authorizationFormId").innerHTML = content;
}

function renderError(value) {
    if (value === true) {
        Object.assign(document.querySelector("#errorMsg").style, {
            display: "block"
        });
        Object.assign(document.querySelector("#emailId").style, {
            border: "1px solid #ed4159",
            color: "#ed4159"
        })
    } else {
        Object.assign(document.querySelector("#errorMsg").style, {
            display: "none"
        });
    }
}

submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = getEmail();
    let password = getPassword();
    let credentials = `{ "email": "${email}", "password": "${password}" }`;

    fetch(url, {
        method: 'POST',
        body: credentials,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200) {
            renderError(true);
        }
        else {
            res.json()
                .then(response => {
                    let responseObj = response;
                    renderContent(responseObj["name"], responseObj["photoUrl"]);
                    document.querySelector("#inputLogoutId").addEventListener("click", function () {
                        renderStartContent(defaultContent);
                    });
                })
        }
    })
        .catch(error => console.error("Fetch error", error));
})