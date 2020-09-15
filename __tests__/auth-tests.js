let supertest = require("supertest");
let server = require("../api/server");
let data = require("../database/dbConfig");

afterAll(async () => {
  await data.destroy();
});

describe("Register Tests", () => {
  it("Test Registration", async () => {
    let res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "taylor", password: "12345" });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("taylor");
  });

  it("Test Username Taken", async () => {
    let res = await supertest(server).post("/api/auth/register").send({
      username: "taylor",
      password: "12345",
    });
    expect(res.statusCode).toBe(409);
    expect(res.type).toBe("application/json");
  });
});

describe("Login Tests", () => {
  it("Test Login", async () => {
    let res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "taylor", password: "12345" });
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("taylor");
  });
  it("Test Invalid Credentials", async () => {
    let res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "tyler", password: "1234" });
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
  });
});

// describe("Joke Tests", () => {
//   it("Test Type", async () => {
//     let res = await supertest(server).get("/api/jokes");
//     expect(res.type).toBe("application/json");
//   });
//   it("Test Length", async () => {
//     let res = await supertest(server).get("/api/jokes");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThanOrEqual(4);
//   });
// });