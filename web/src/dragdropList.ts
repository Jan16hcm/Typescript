import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const items = document.querySelectorAll<HTMLLIElement>(".list-group-item");
let dragItem: HTMLLIElement | null;

function swapElement(node1: HTMLLIElement, node2: HTMLLIElement) {
    let temp = document.createElement("li");

    node1.parentElement?.insertBefore(temp, node1);
    node2.parentElement?.insertBefore(node1, node2);
    temp.parentElement?.insertBefore(node2, temp);
    temp.remove();
}

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        dragItem = item;
        item.classList.remove("bg-secondary");
        item.classList.add("opacity-50", "active");
    })

    item.addEventListener("dragover", (event:Event) => {
        event.preventDefault();
    })

    item.addEventListener("drop", (event:Event) => {
        event.preventDefault();

        let dragEndItem = event.currentTarget as HTMLLIElement;

        if(dragItem && dragItem != dragEndItem) {
            swapElement(dragItem, dragEndItem);
        }
    })

    item.addEventListener("dragend", () => {
        item.classList.remove("opacity-50", "active");
        item.classList.add("bg-secondary");
    })
})