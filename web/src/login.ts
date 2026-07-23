import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface validationResult {
  errorMessage: string,
  isSuccess: boolean,
  accountNotFound?: boolean,
  userError?: boolean,
  passError?: boolean
}

export function validAccount(user: string, pass: string):validationResult {
  const invalidWord = /[!@#$%^&*(),.?';"{}<>|~`]/;
  if(user === "" && pass === "") {
    return {errorMessage: "The login information you entered is incorrect.", isSuccess: false, userError: true, passError: true};
  }

  else if(user === "" || user.length < 3 || invalidWord.test(user)) {
    return {errorMessage: "Please enter a username with only letters, numbers, or underscores (3-20 characters).", isSuccess: false, userError: true, passError: false};
  }

  else if(pass === "" || pass.length < 6) {
    return {errorMessage: "Password must be at least 6 characters.", isSuccess: false, userError: false, passError: true};
  }

  else if(user === "binsuong" && pass === "123456") {
    return {errorMessage: "", isSuccess: true};
  }

  return {errorMessage: "", isSuccess: true, accountNotFound: true};
}

const username = document.querySelector<HTMLInputElement>("#username");
const password = document.querySelector<HTMLInputElement>("#password");
const toggleBtn = document.querySelector<HTMLButtonElement>("#toggleBtn");
const eye = toggleBtn?.querySelector<HTMLElement>("i");
const form = document.querySelector<HTMLFormElement>("#validForm");
const errorMessage = document.querySelector<HTMLDivElement>("#errorMessage");

function showMessage(
  errorMessage: HTMLDivElement,
  text: string,
  userInput?: HTMLInputElement | undefined,
  passInput?: HTMLInputElement | undefined,
): void {
  errorMessage.innerHTML = text;
  errorMessage.classList.remove("invisible");

  if (userInput) {
    userInput.classList.add("is-invalid");
  }
  if (passInput) {
    passInput.classList.add("is-invalid");
  }
  if (userInput) {
    userInput.focus();
  } else if (passInput) {
    passInput.focus();
  }
}
if (form && username && password && toggleBtn && errorMessage && eye) {
  username.addEventListener("input", () => {
    username.classList.remove("is-invalid");
    errorMessage.classList.add("invisible");
  });

  password.addEventListener("input", () => {
    password.classList.remove("is-invalid");
    errorMessage.classList.add("invisible");
  });

  toggleBtn.addEventListener("click", () => {
    const isPassword: boolean = password.type === "password";
    password.type = isPassword ? "text" : "password";
    eye.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye-fill";
  });

  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    [username, password].forEach((input) => input.classList.remove("is-invalid"));

    const userValue = username.value.trim();
    const passValue = password.value.trim();

    const result = validAccount(userValue, passValue);

    if (result.isSuccess === false) {
      if (result.userError && result.passError && errorMessage) {
        showMessage(errorMessage, result.errorMessage, username, password);

      } else if (
        result.userError &&
        errorMessage
      ) {
        showMessage(errorMessage, result.errorMessage, username, undefined);

      } else if (
        result.passError &&
        errorMessage
      ) {
        showMessage(errorMessage, result.errorMessage, undefined ,password);

      }
    } else {
      if (result.accountNotFound) {
        const notFoundMessage =
          "The login information you entered is incorrect.";
        showMessage(errorMessage, notFoundMessage);

      } else {
        window.location.assign("../Counter.html");
      }
    }
  });
}

