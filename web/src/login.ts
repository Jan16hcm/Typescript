interface validationResult {
  errorMessage: string,
  isSuccess: boolean
}

export function validAccount(user: string, pass: string):validationResult {
  const invalidWord = /[!@#$%^&*(),.?';"{}<>|~`]/;

  if(user === "" && pass === "") {
    return {errorMessage: "Username or password is incorrect. Please try again!", isSuccess: false};
  }

  if(user === "" || user.length < 3 || invalidWord.test(user)) {
    return {errorMessage: "Please enter a username with only letters, numbers, or underscores (3-20 characters).", isSuccess: false};
  }

  if(pass === "" || pass.length < 6) {
    return {errorMessage: "Password must be at least 6 characters.", isSuccess: false};
  }

  if(user === "binsuong" && pass === "123456") {
    return {errorMessage: "", isSuccess: true};
  }

  return {errorMessage: "", isSuccess: false};
}