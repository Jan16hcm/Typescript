let count = 0;
export function countCounter(element: HTMLDivElement, input: number) {
  count += input;
  element.innerHTML = count.toString();
}

export function resetCounter(element: HTMLDivElement) {
  count = 0;
  element.innerHTML = count.toString();
}
