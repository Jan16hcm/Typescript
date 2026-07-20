interface validationResult {
  userError: string;
  passError: string;
  isSuccess: boolean;
}

export function validAccount(user: string, pass: string): validationResult {
  let userError = "";
  let passError = "";
  let isSuccess = false;
  const invalidWord = /[!@#$%^&*(),.?';"{}<>|]/;

  if (user === "" || user.length < 3 || invalidWord.test(user)) {
    userError =
      "Please enter a username with only letters, numbers, or underscores (3-20 characters).";
  }

  if (pass === "" || pass.length < 6) {
    passError = "Password must be at least 6 characters.";
  }

  if (userError === "" && passError === "") {
    if (user === "binsuong" && pass === "123456") {
      isSuccess = true;
    } else {
      passError = "Username or password is incorrect. Please try again";
    }
  }

  return {
    userError,
    passError,
    isSuccess,
  };
}
