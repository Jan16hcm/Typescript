import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { validAccount } from "./login";
import { countCounter } from "./counter";

const username = document.querySelector<HTMLInputElement>("#username");
const password = document.querySelector<HTMLInputElement>("#password");
const toggleBtn = document.querySelector<HTMLButtonElement>("#toggleBtn");
const form = document.querySelector<HTMLFormElement>("#validForm");
const errorMessage = document.querySelector<HTMLDivElement>("#errorMessage");

if(form && username && password && toggleBtn && errorMessage) {
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const userValue = username.value.trim();
    const passValue = password.value.trim();

    const result  = validAccount(userValue, passValue);

    if(result.isSuccess === false) {

    } else {
      
    }


  })
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