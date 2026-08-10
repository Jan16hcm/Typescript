const messageContainer = document.querySelector("#messageContainer");
let count = 1;

function sendMessage(text, type) {
  let htmlForm = `
    <div class="alert alert-${type} fade show">
        <div class="d-flex justify-content-between align-items-center">
            <div><i class="bi bi-${count}-circle-fill me-2" ></i>${text}</div>

            <button id="btnClose" type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </div>
    
    `;
  messageContainer.insertAdjacentHTML("beforeend", htmlForm);
  messageContainer.scrollTop = messageContainer.scrollHeight;
  count++;
}

const alertDiv = document.querySelector("#alertDiv");
const recipientText = document.querySelector("#recipientText");
const messageText = document.querySelector("#messageText");
const formModal = document.querySelector("#formModal");

recipientText.addEventListener("input", () => {
  alertDiv.classList.add("d-none");
});

messageText.addEventListener("input", () => {
  alertDiv.classList.add("d-none");
});

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  if (
    recipientText.value.trim() === "" ||
    messageText.value.trim() === ""
  ) {
    isValid = false;
  }
  const type = isValid ? "success" : "danger";
  let htmlForm = `
    <div class="alert align-items-center alert-${type}">
        <span>${isValid ? "Message sent successfully!" : "Please fill in all fields"}</span>
    </div>
  `;
  alertDiv.classList.remove("d-none");
  alertDiv.innerHTML = htmlForm;
});
