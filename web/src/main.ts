import 'bootstrap/dist/css/bootstrap.min.css';
import { countCounter, resetCounter } from './counter.ts';
document.querySelector<HTMLButtonElement>("#btn-increase")?.addEventListener("click", () => {
  countCounter(document.querySelector<HTMLDivElement>("#counter")!, 1);
});

document.querySelector<HTMLButtonElement>("#btn-decrease")?.addEventListener("click", () => {
  countCounter(document.querySelector<HTMLDivElement>("#counter")!, -1);
});

document.querySelector<HTMLButtonElement>("#btn-reset")?.addEventListener("click", () => {
  resetCounter(document.querySelector<HTMLDivElement>("#counter")!);
})