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
    messageContainer.insertAdjacentHTML('beforeend', htmlForm);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  count++;
}
