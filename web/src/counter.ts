import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

let count = 0;
function countCounter(element: HTMLDivElement, input: number) {
  count += input;
  element.innerHTML = count.toString();
}

function resetCounter(element: HTMLDivElement) {
  count = 0;
  element.innerHTML = count.toString();
}

const counter = document.querySelector<HTMLDivElement>("#counter");
const increaseBtn = document.querySelector<HTMLButtonElement>("#increaseBtn");
const decreaseBtn = document.querySelector<HTMLButtonElement>("#decreaseBtn");
const resetBtn = document.querySelector<HTMLButtonElement>("#resetBtn");
if (counter && increaseBtn && decreaseBtn && resetBtn) {
  increaseBtn.addEventListener("click", () => countCounter(counter, 1));
  decreaseBtn.addEventListener("click", () => countCounter(counter, -1));
  resetBtn.addEventListener("click", () => resetCounter(counter));
}
