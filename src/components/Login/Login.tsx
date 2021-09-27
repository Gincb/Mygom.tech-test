import {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Routes} from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';

import './login-style.scss';

const Login = () => {
  const {push} = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const usernameValidation = () => {
    if(username.length == 0) {
      setUsernameError('Please enter your username');
    } else if(username.length <= 4) {
      setUsernameError('Your username should be longer than 4 letters');
    } else if(checkSymbols(username)) {
      setUsernameError('Your username shouldn`t contain other symbols than _ or -')
    } else {
      setUsernameError('')
    }

    return usernameError;
  }

  const checkSymbols = (username: string) => {
    const symbols = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;
    const checkForSymbols = symbols.test(username);
    return checkForSymbols;
  }

  const passwordVaildation = () => {
    if(password.length == 0) {
      setPasswordError('Please enter your password');
    } else if(password.length <= 4) {
      setPasswordError('Your password should be longer than 4 letters');
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    usernameValidation();
    passwordVaildation();

    try {
      await login(username, password);
      push(Routes.Users);
    } catch (error) {
      setErrorMessage('Password is incorrect or a user with that name doesn`t exist');
    }
  };

    return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">
          Mygom.tech
        </h1>

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <ErrorBlock error={usernameError}/>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <ErrorBlock error={passwordError}/>
        {usernameError || passwordError ? '' : <ErrorBlock error={errorMessage}/>}
        <button type="submit" className="button mt-24px">
          Login
        </button>
      </form>
    </div>
  )
};

export default Login;
