// Write your tests here
const supertest = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

// test('sanity', () => {
//   expect(true).toBe(false)
// })

describe("users auth register", () => {
  it("creates a new user", async() => {
    const res = await supertest(server)
    .post("/api/auth/register")
    .send({
      username : "xiao", password : "almondtofu"
    })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.id).toBeDefined()
    expect(res.body.username).toBe("xiao")
  })
  it("error message for register", async() => {
    const res = await supertest(server)
    .post("/api/auth/register")
    .send({
      username : "", password : "asdasr3r"
    })
    expect(res.statusCode).toBe(404)
    expect(res.body.message).toBe("Username and password required")
  })
})

describe("users auth login", () => {
  it("successfully logged in", async() => {
    await supertest(server)
    .post("/api/auth/register")
    .send({
      username : "xiao", password : "almondtofu"
    })
    const res = await supertest(server)
    .post("/api/auth/login")
    .send({
      username : "xiao", password : "almondtofu"
    })
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("welcome, xiao")
  })
  it("failed logged in", async() => {
    const res = await supertest(server)
    // .post("/api/auth/register")
    // .send({
    //   username : "xiao", password : "almondtofu"
    // })
    .post("/api/auth/login")
    .send({
      username : "xiao", password : "almondtofi"
    })
    expect(res.statusCode).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Invalid credentials")
  })
})