import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const clearBtn = document.querySelector<HTMLButtonElement>("#clearBtn");
const numbers = document.querySelectorAll<HTMLButtonElement>(".number");
let answer = document.querySelector<HTMLDivElement>("#answer");
const calcBtn = document.querySelector<HTMLButtonElement>("#calcBtn");
const powerBtn = document.querySelector<HTMLButtonElement>("#powerBtn");
const remainerBtn = document.querySelector<HTMLButtonElement>("#remainerBtn");
const dividedBtn = document.querySelector<HTMLButtonElement>("#dividedBtn");
const multiplyBtn = document.querySelector<HTMLButtonElement>("#multiplyBtn");
const negativeBtn = document.querySelector<HTMLButtonElement>("#negativeBtn");
const positiveBtn = document.querySelector<HTMLButtonElement>("#positiveBtn");
const buttons = document.querySelectorAll<HTMLButtonElement>("button");

function checkLengthLimit(): void {
    if(answer && answer.textContent && answer.textContent.length >= 15) {
        buttons.forEach((btn) => {
            btn.disabled = true;
        })

        if(clearBtn) {
            clearBtn.disabled = false;
        }
    }
}

if (clearBtn && numbers && answer && calcBtn && powerBtn && remainerBtn && dividedBtn && multiplyBtn && negativeBtn && positiveBtn && buttons) {

    
    clearBtn.addEventListener("click", () => {
        answer.textContent = "0";
        
        buttons.forEach((btn) => {
            btn.disabled = false;
        })
    })
    
    
    numbers.forEach((number) => {
        number.addEventListener("click", () => {
            answer.textContent =
            answer.textContent.trim() === "0"
            ? number.textContent
            : (answer.textContent += number.textContent);

            checkLengthLimit();
        });
    });
}
