import { Stack } from "./stack";
import { getAns } from "./calculator";
function isDigit(input: string): boolean {
  return /^[0-9]$/.test(input);
}

function getPriority(char: string): number {
  switch (char) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "%":
    case "^":
      return 3;
  }
  return 0;
}
function infixToPostfix(input: string): string {
  const stack = new Stack<string>();
  let postFix: string = "";

  for (let i: number = 0; i < input.length; i++) {
    let token: string = input[i];
    if (token === " ") continue;

    if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (!stack.isEmpty() && stack.peek() !== "(") {
        postFix += stack.pop();
      }
      stack.pop();
    } else {
      if (isDigit(token)) {
        let numStr = "";

        while (i < input.length && isDigit(input[i])) {
          numStr += input[i];
          i++;
        }

        postFix += numStr + " ";
        i--;
        continue;
      } else {
        while (!stack.isEmpty()) {
          const topOp: string = stack.peek() || "";
          const topOpPriority: number = getPriority(topOp);
          const currPriority: number = getPriority(token);

          if (token === "^") {
            if (topOpPriority > currPriority) {
              postFix += stack.pop() + " ";
            } else {
              break;
            }
          } else {
            if (topOpPriority >= currPriority) {
              postFix += stack.pop() + " ";
            } else {
              break;
            }
          }
        }
        stack.push(token);
      }
    }
  }
  while (!stack.isEmpty()) {
    postFix += stack.pop() + " ";
  }
  return postFix;
}

export function calculate(input: string): string {
  let text = input.replace(/ans/gi, getAns());
  console.log("text: " + text);
  const postFix = infixToPostfix(text);

  let tokens: string[] = postFix.split(" ");
  let result: number = 0;
  const stack = new Stack<string>();

  for (let token of tokens) {
    if (token === "") continue;
    if (!isNaN(Number(token))) {
      stack.push(token);
    } else {
      if (token === "%") {
        const a = stack.pop();
        if (a === undefined) return "Invalid expression";

        result = Number(a) / 100;
        stack.push(result.toString());
        continue;
      }
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case "+":
          result = Number(a) + Number(b);
          stack.push(result.toString());
          break;
        case "-":
          result = Number(a) - Number(b);
          stack.push(result.toString());
          break;
        case "*":
          result = Number(a) * Number(b);
          stack.push(result.toString());
          break;
        case "/":
          if (Number(b) === 0) {
            return "Cannot divide by 0";
          } else {
            result = Number(a) / Number(b);
            stack.push(result.toString());
            break;
          }
        case "^":
          result = Math.pow(Number(a), Number(b));
          stack.push(result.toString());
          break;
      }
    }
    console.log("Calc: " + stack.peek()?.toString() + "\n");
  }
  if (stack.size() >= 2 || stack.isEmpty()) {
    return "Invalid expression";
  }
  return stack.pop() || "Cannot divide by 0";
}
