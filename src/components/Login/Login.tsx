import { SyntheticEvent, useState } from "react"
import { useHistory } from "react-router-dom"
import { Routes } from "~/constants"
import login from "~/services/login"
import ErrorBlock from "../ErrorBlock"
import {
  usernameValidation,
  passwordVaildation,
} from "../../utils/loginValidation"
import LoadingScreen from "../LoadingScreen"

import "./login-style.scss"

const Login = () => {
  const { push } = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string>()
  const [usernameError, setUsernameError] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    usernameValidation(username, setUsernameError)
    passwordVaildation(password, setPasswordError)

    try {
      await login(username, password)
      push(Routes.Users)
      setIsLoading(false)
    } catch (error) {
      setErrorMessage(
        "Password is incorrect or a user with that name doesn`t exist"
      )
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="text-center">Mygom.tech</h1>

          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            type="text"
            className="input mt-52px"
          />
          <ErrorBlock error={usernameError} />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            className="input mt-24px"
          />
          <ErrorBlock error={passwordError} />
          {usernameError || passwordError ? (
            ""
          ) : (
            <ErrorBlock error={errorMessage} />
          )}
          <button type="submit" className="button mt-24px">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default Login
