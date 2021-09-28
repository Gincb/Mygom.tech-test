import "@testing-library/jest-dom/extend-expect"
import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from "../components/Login/Login"

describe("Login", () => {
  beforeEach(() => {
    render(<Login />)
  })
  afterEach(cleanup)

  describe("username matches validation conditions", () => {
    it("show error if username is longer than 4 letters", async () => {
      userEvent.type(screen.getByPlaceholderText(/username/i), "test")
      userEvent.click(screen.getByRole("button"))
      await waitFor(() => {
        expect(
          screen.getByText(/your username should be longer than 4 letters/i)
        ).toBeInTheDocument()
      })
    })

    it("show error if username has a symbol", async () => {
      userEvent.type(screen.getByPlaceholderText(/username/i), "te$ter")
      userEvent.click(screen.getByRole("button"))
      await waitFor(() => {
        expect(
          screen.getByText(
            /your username shouldn`t contain other symbols than _ or -/i
          )
        ).toBeInTheDocument()
      })
    })

    it("show error if username is empty", async () => {
      userEvent.type(screen.getByPlaceholderText(/username/i), "")
      userEvent.click(screen.getByRole("button"))
      await waitFor(() => {
        expect(
          screen.getByText(/please enter your username/i)
        ).toBeInTheDocument()
      })
    })
  })

  describe("password matches validation conditions", () => {
    it("show error if password is longer than 4 letters", async () => {
      userEvent.type(screen.getByPlaceholderText(/password/i), "test")
      userEvent.click(screen.getByRole("button"))
      await waitFor(() => {
        expect(
          screen.getByText(/your password should be longer than 4 letters/i)
        ).toBeInTheDocument()
      })
    })

    it("show error if username is empty", async () => {
      userEvent.type(screen.getByPlaceholderText(/password/i), "")
      userEvent.click(screen.getByRole("button"))
      await waitFor(() => {
        expect(
          screen.getByText(/please enter your password/i)
        ).toBeInTheDocument()
      })
    })
  })

  describe("login is successful", () => {
    it("show error if login is unsuccessful", async () => {
      userEvent.type(screen.getByPlaceholderText(/username/i), "tester")
      userEvent.type(screen.getByPlaceholderText(/password/i), "somepassword")
      userEvent.click(screen.getByRole("button"))
      await waitFor(() => {
        expect(
          screen.getByText(
            /password is incorrect or a user with that name doesn`t exist/i
          )
        ).toBeInTheDocument()
      })
    })
  })
})
