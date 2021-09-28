import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from '../components/UsersManagement/components/List/List'

describe("Update Modal functionality", () => {
  enum Roles {
    read = "read",
    write = "write",
    amin = "amin",
  }

  const items = [
    {
      id: "001",
      name: "Tomas Tomaitis",
      email: "test@test.com",
      role: Roles.amin,
      createdAt: new Date().toISOString(),
    }
  ]

  beforeEach(() => {
    render(<List items={items} />)
  })
  afterEach(cleanup)
  
  it("should open modal on click", () => {
    userEvent.click(screen.getByText(/update email/i));
    expect(screen.getByText(/change/i));
    expect(screen.getByText(/cancel/i));
  });

  it("should close modal on cancel", () => {
    userEvent.click(screen.getByText(/update email/i));
    userEvent.click(screen.getByText(/cancel/i));
    expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
  });
})
