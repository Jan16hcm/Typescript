import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { calculate } from "./infixToPostfix";
const LIMIT_LENGTH = 32;

const clearBtn = document.querySelector<HTMLButtonElement>("#clearBtn");
const numbers = document.querySelectorAll<HTMLButtonElement>(".number");
let answer = document.querySelector<HTMLDivElement>("#answer");
let lastAnsValue: string = "0";
let subAnswer = document.querySelector<HTMLDivElement>("#subAnswer");
let ansBtn = document.querySelector<HTMLButtonElement>("#ansBtn");
let countBracket: number = 0;
const closeBracketBtn =
  document.querySelector<HTMLButtonElement>("#closeBracketBtn");
const calcBtn = document.querySelector<HTMLButtonElement>("#calcBtn");
const powerBtn = document.querySelector<HTMLButtonElement>("#powerBtn");
const remainerBtn = document.querySelector<HTMLButtonElement>("#remainerBtn");
const dividedBtn = document.querySelector<HTMLButtonElement>("#dividedBtn");
const multiplyBtn = document.querySelector<HTMLButtonElement>("#multiplyBtn");
const negativeBtn = document.querySelector<HTMLButtonElement>("#negativeBtn");
const positiveBtn = document.querySelector<HTMLButtonElement>("#positiveBtn");
const operations = document.querySelectorAll<HTMLButtonElement>(".operation");
const buttons = document.querySelectorAll<HTMLButtonElement>("button");

export function getAns(): string {
  return lastAnsValue;
}

function setAns(value: string): void {
  if (!isNaN(Number(value))) {
    lastAnsValue = value;
  }
}

function checkLengthLimit(): void {
  if (getAnswerLength() >= LIMIT_LENGTH) {
    console.warn(
      `[Limit Reached] Màn hình đã đạt tối đa ${getAnswerLength()}/${LIMIT_LENGTH} ký tự!`,
    );
    buttons.forEach((btn) => {
      btn.disabled = true;
    });

    if (clearBtn) {
      clearBtn.disabled = false;
    }
  }
}

function getAnswerText(): string {
  return answer?.textContent.trim() || "";
}

function getAnswerLength(): number {
  return getAnswerText().length;
}

function setAnswerContent(input: string): void {
  if (getAnswerLength() >= 15) return;
  if (answer) {
    answer.textContent = getAnswerText().slice(0, -1) + input;
  }
}

function addAnswerContent(input: string): void {
  if (getAnswerLength() >= 15) return;
  if (answer) {
    answer.textContent += " " + input;
  }
  checkLengthLimit();
}

export function isDigit(input: string): boolean {
  return /^[0-9]$/.test(input);
}

if (
  clearBtn &&
  numbers &&
  answer &&
  subAnswer &&
  ansBtn &&
  calcBtn &&
  powerBtn &&
  remainerBtn &&
  dividedBtn &&
  multiplyBtn &&
  negativeBtn &&
  positiveBtn &&
  operations &&
  buttons
) {
  clearBtn.addEventListener("click", () => {
    answer.textContent = "0";

    buttons.forEach((btn) => {
      btn.disabled = false;
    });
    console.log(clearBtn.id);
  });

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      const previousCharacter: string = getAnswerText()[getAnswerLength() - 1];
      if (getAnswerText() === "0") {
        setAnswerContent(number.textContent);
      } else {
        if (isDigit(previousCharacter)) {
          answer.textContent += number.textContent;
        } else if (previousCharacter === "-" && getAnswerLength() === 1) {
          answer.textContent += number.textContent;
        } else {
          addAnswerContent(number.textContent);
        }
      }
      console.log(
        "Previous character: " +
          previousCharacter +
          "\nCurrent answer: " +
          getAnswerText(),
      );
      checkLengthLimit();
    });
  });

  operations.forEach((operation) => {
    operation.addEventListener("click", () => {
      const previousCharacter: string = getAnswerText()[getAnswerLength() - 1];
      const typeOperation = operation.id;

      console.log("\n" + typeOperation);

      switch (typeOperation) {
        case "negativeBtn":
          /**
           * TODO:
           * - If previous is plus or 0 will replace
           * - If previous is x, /, %, ., ^ digit will add to answer
           * - Prevent duplicate
           */
          if (
            ["*", "/", "%", ".", ")", "%"].includes(previousCharacter) ||
            isDigit(previousCharacter)
          ) {
            if (previousCharacter === "0" && getAnswerLength() === 1) {
              setAnswerContent(operation.textContent);
            } else {
              addAnswerContent(operation.textContent);
            }
          } else if (previousCharacter === "+") {
            setAnswerContent(operation.textContent);
          } else if (previousCharacter === operation.textContent) {
            console.log("Duplicate operation");
          }

          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "positiveBtn":
          /**
           * TODO:
           * - Replace with all operation
           * - If previous is negative op and length answer is only 1 with negative Then will ignore all button
           * - If previous is %, ., digit will add to answer
           */
          if (
            ["%", ".", ")", "%"].includes(previousCharacter) ||
            isDigit(previousCharacter)
          ) {
            addAnswerContent(operation.textContent);
          } else if (["*", "/", "-"].includes(previousCharacter)) {
            if (previousCharacter === "-" && getAnswerLength() === 1) {
              console.log("Ignore '+' when text is just '-'");
            } else {
              setAnswerContent(operation.textContent);
            }
          } else if (previousCharacter === "(") {
            console.log("Cannot put operator right after '('");
          } else if (previousCharacter === operation.textContent) {
            console.log("Duplicate operation");
          }
          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "multiplyBtn":
          /**
           * TODO:
           * Replace all operation but in case answer is: - will ignore
           * If previous is %, ., digit will add to answer
           * If previous is ^ will ignore
           */
          if (
            ["%", ".", ")", "%"].includes(previousCharacter) ||
            isDigit(previousCharacter)
          ) {
            addAnswerContent(operation.textContent);
          } else if (["+", "/", "-"].includes(previousCharacter)) {
            if (previousCharacter === "-" && getAnswerLength() === 1) {
              console.log("Ignore '*' when text is just '-'");
            } else {
              setAnswerContent(operation.textContent);
            }
          } else if (previousCharacter === "(") {
            console.log("Cannot put operator right after '('");
          } else if (previousCharacter === operation.textContent) {
            console.log("Duplicate operation");
          }

          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "dividedBtn":
          /**
           * TODO:
           * Replace all operation but in case answer is only one -: will ignore
           * If previous is %, ., digit will add to answer
           * If previous is ^ will ignore
           */
          if (
            ["%", ".", ")", "%"].includes(previousCharacter) ||
            isDigit(previousCharacter)
          ) {
            addAnswerContent(operation.textContent);
          } else if (["+", "*", "-"].includes(previousCharacter)) {
            if (previousCharacter === "-" && getAnswerLength() === 1) {
              console.log("Ignore '/' when text is just '-'");
            } else {
              setAnswerContent(operation.textContent);
            }
          } else if (previousCharacter === "(") {
            console.log("Cannot put operator right after '('");
          } else if (previousCharacter === operation.textContent) {
            console.log("Duplicate operation");
          }

          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "remainerBtn":
          if (!isNaN(Number(previousCharacter))) {
            answer.textContent += "%";
          } else {
          }
          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "powerBtn":
          if (!isNaN(Number(previousCharacter))) {
            answer.textContent += "^ (";
            countBracket++;
          } else {
          }
          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "ansBtn":
          if (!isNaN(Number(previousCharacter))) {
          } else {
            addAnswerContent("Ans");
          }
          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;

        case "closeBracketBtn":
          if (countBracket % 2 != 0 && countBracket != 0) {
            addAnswerContent(")");
          }
          console.log(
            "Previous character: " +
              previousCharacter +
              "\nCurrent answer: " +
              getAnswerText(),
          );
          break;
        case "calcBtn":
          const input: string = answer.textContent || "";

          if (!input.trim()) break;
          console.log("Last ans: " + getAns());
          const result = calculate(input);

          subAnswer.textContent = `${input} =`;
          answer.textContent = result;

          setAns(result);
          break;
      }
    });
  });
}
