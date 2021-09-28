import "@testing-library/jest-dom/extend-expect";
import itemIsOld from '../utils/itemIsOld'
import itemIsReused from '../utils/itemIsReused'
import itemIsWrong from '../utils/itemIsWrong'

describe("Filter Tabs functionality", () => {
  enum Roles {
    read = 'read',
    write = 'write',
    amin = 'amin'
  }

  const items = [
    {
      id: "001",
      name: "Tomas Tomaitis",
      email: "test@test.com",
      role: Roles.amin,
      createdAt: new Date().toISOString()
    },
    {
      id: "002",
      name: "Petras Petraitis",
      email: "test@test.com",
      role: Roles.amin,
      createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
    }, {
      id: "003",
      name: "Jonas Jonaitis",
      email: "test133",
      role: Roles.amin,
      createdAt: new Date().toISOString()
    }]


  it("should return true if there are older items than 30 days", async () => {
    expect(itemIsOld(items).length).toBe(1)
  });

  it("should return true if there are reused items", async () => {
    expect(itemIsReused(items[0], items)).toBe(true)
  });

  it("should return true if there are invalid items", async () => {
    expect(itemIsWrong(items).length).toBe(1)
  });
})
