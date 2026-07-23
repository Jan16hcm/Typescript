interface validationResult {
  errorMessage: string,
  isSuccess: boolean,
  accountNotFound?: boolean,
  userError?: boolean,
  passError?: boolean
}

export function validAccount(user: string, pass: string):validationResult {
  const invalidWord = /[!@#$%^&*(),.?';"{}<>|~`]/;
  if(user === "" && pass === "") {
    return {errorMessage: "The login information you entered is incorrect.", isSuccess: false, userError: true, passError: true};
  }

  else if(user === "" || user.length < 3 || invalidWord.test(user)) {
    return {errorMessage: "Please enter a username with only letters, numbers, or underscores (3-20 characters).", isSuccess: false, userError: true, passError: false};
  }

  else if(pass === "" || pass.length < 6) {
    return {errorMessage: "Password must be at least 6 characters.", isSuccess: false, userError: false, passError: true};
  }

  else if(user === "binsuong" && pass === "123456") {
    return {errorMessage: "", isSuccess: true};
  }

  return {errorMessage: "", isSuccess: true, accountNotFound: true};
}