import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { validAccount } from "./login";
import { countCounter } from "./counter";

const username = document.querySelector<HTMLInputElement>("#username");
const password = document.querySelector<HTMLInputElement>("#password");
const toggleBtn = document.querySelector<HTMLButtonElement>("#toggleBtn");
const form = document.querySelector<HTMLFormElement>("#validForm");

if (form && password && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isPassword: boolean = password.type === "password";

    password.type = isPassword ? "text" : "password";

    const eye = toggleBtn.querySelector("i");
    if (eye) {
      eye.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye-fill";
    }
  });
}

if (form && username && password) {
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    const userValue = username.value.trim();
    const passValue = password.value.trim();

    const result = validAccount(userValue, passValue);

    const errorMessage = document.querySelector<HTMLDivElement>("#errorMessage");

    if (result.userError) {
      username.classList.add("is-invalid");
      userFeedBack.textContent = result.userError;
    } else {
      username.classList.remove("is-invalid");
    }

    if (result.passError) {
      password.classList.add("is-invalid");
      passFeedBack.textContent = result.passError;
    } else {
      password.classList.remove("is-invalid");
    }

    if (result.userError) {
      username.focus();
    } else if (result.passError) {
      password.focus();
    } else if (result.isSuccess) {
      window.location.assign("../Counter.html");
    }
  });
  username.addEventListener("input", () => {
    username.classList.remove("is-invalid");
  });

  password.addEventListener("input", () => {
    password.classList.remove("is-invalid");
  });
}


//Counter
const counter = document.querySelector<HTMLDivElement>("#counter");
const increaseBtn = document.querySelector<HTMLButtonElement>("#increaseBtn");
const decreaseBtn = document.querySelector<HTMLButtonElement>("#decreaseBtn");
const resetBtn = document.querySelector<HTMLButtonElement>("#resetBtn");
if(counter && increaseBtn && decreaseBtn && resetBtn) {
  increaseBtn.addEventListener("click", () => countCounter(counter, 1));
  decreaseBtn.addEventListener("click", () => countCounter(counter, -1));
  resetBtn.addEventListener("click", () => countCounter(counter, 0));

}