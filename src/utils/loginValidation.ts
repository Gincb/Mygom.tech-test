export const usernameValidation = (username: string, callback: (arg0: string) => void) => {
  if(username.length == 0) {
    callback('Please enter your username');
  } else if(username.length <= 4) {
    callback('Your username should be longer than 4 letters');
  } else if(checkSymbols(username)) {
    callback('Your username shouldn`t contain other symbols than _ or -')
  } else {
    callback('')
  }
}

const checkSymbols = (username: string) => {
  const symbols = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;
  const checkForSymbols = symbols.test(username);
  return checkForSymbols;
}

export const passwordVaildation = (password: string, callback: (arg0: string) => void) => {
  if(password.length == 0) {
    callback('Please enter your password');
  } else if(password.length <= 4) {
    callback('Your password should be longer than 4 letters');
  } else {
    callback('')
  }
}
